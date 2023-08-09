import React, { useEffect, useState } from 'react';
import styles from './upload.less';
import cn from 'classnames';
import moment from 'moment';
import { API_ENDPOINT, DATE_DDMMYY, URL_FILES, URL_FILES_LIST, URL_FILES_REMOVE, URL_FILES_UPLOAD, URL_FILES_EDIT } from '../app/config/consts';
import CloseIcon from './closeCross_orange.svg';
import RightIcon from './arrow_right_yellow.svg';
import LeftIcon from './arrow_left_yellow.svg';
import EditIcon from './edit.svg';
import axios from 'axios';

export const UploadPage = () => {
    const [formData, setFormData] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [lastUploadStatus, setLastUploadStatus] = useState(null);
    const [page, setPage] = useState(0);
    const [data, setData] = useState(null);
    const [allFiles, setAllFiles] = useState([]);
    const [uploadResult, setUploadResult] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [elementToDelete, setElementToDelete] = useState({});
    const [blockUpload, setBlockUpload] = useState(false);

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        refetch();
    }, [elementToDelete, data, page]);

    useEffect(() => {
        const uploadFile = async () => {
            try {
                const data = await axios.post(API_ENDPOINT + URL_FILES_UPLOAD, formData);
                console.log(data);
                setData(data);
            } catch (err) {
                setData(err);
            }
        };
        setUploadResult(data);
        formData && uploadFile();
    }, [formData]);

    useEffect(() => {
        if (formData && uploadResult) {
            if (uploadResult.success) {
                handleSuccess(uploadResult.data);
            } else {
                handleError(uploadResult.data);
            }
            setFormData(null);
        }
    }, [uploadResult]);

    const refetch = async () => {
        console.log('refetch');
        const { data } = await axios.get(API_ENDPOINT + URL_FILES_LIST + '?page=' + page);
        setAllFiles(data);
        setIsFetching(false);
        return data;
    };

    const onFileChange = (event) => {
        setBlockUpload(false);
        let filesArr = Array.from(event.target.files);
        filesArr.map((el) => {
            if (isTooBig(el.size)) {
                setBlockUpload(true);
            }
        });
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleError = (e) => {
        if (e?.response?.status === 401) {
            alert('Error: 401');
            return;
        }
        setLastUploadStatus({
            status: e?.response?.status,
            statusText: e?.response?.data.text || e?.response?.statusText,
        });
    };

    const handleSuccess = (lastUploadStatus) => {
        setLastUploadStatus(lastUploadStatus);
        refetch();
    };

    const handleSetFormData = async () => {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            const name = encodeURIComponent(selectedFiles[i].name);
            formData.append(`uploadFile_${i}`, selectedFiles[i], name);
        }
        setFormData(formData);
    };

    const filePattern = (el, idx) => (
        <div className={styles.uploadList} key={idx}>
            <span className={cn({ [styles.red]: isTooBig(el.size) || isTooLong(el.name) })}>
                File: {el.name}:, Size: {el.size}, {moment(el.lastModifiedDate).format(DATE_DDMMYY)}
            </span>
        </div>
    );

    const fileData = () => {
        if (selectedFiles) {
            return <div className={styles.uploadFile}>{!!selectedFiles.length && selectedFiles.map((el, idx) => filePattern(el, idx))}</div>;
        }
    };

    const onRemove = async (el) => {
        let obj = { id: el._id };
        await axios.post(API_ENDPOINT + URL_FILES_REMOVE, obj).then(() =>
            setElementToDelete(
                allFiles.find((e) => {
                    return e._id == el._id;
                }),
            ),
        );
    };

    const onEdit = async (el) => {
        let fileName = '';
        fileName = prompt(fileName, el.fileName);
        let obj = { id: el._id, fileName: fileName };
        console.log(obj);
        await axios.post(API_ENDPOINT + URL_FILES_EDIT, obj).then(() =>
            setElementToDelete(
                allFiles.find((e) => {
                    return e._id == el._id;
                }),
            ),
        );
    };

    const isTooLong = (str) => {
        return encodeURIComponent(str).length > 255;
    };

    const isTooBig = (file) => {
        return file > 20480000;
    };

    return (
        <div className={styles.uploadWrapper}>
            <h4>File store management</h4>
            <div className={styles.mainContent}>
                <div className={cn(styles.aside, styles.filesPlace)}>
                    <div className={styles.topFilters}>
                        <div>
                            Файлы в хранилище: <button onClick={refetch}>обновить список</button>
                        </div>
                        <div className={styles.pageListPlace}>
                            <span className={styles.pageCounter}>Current Page: {page + 1}</span>
                            <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
                                <img src={RightIcon} alt="<" width={10} height={10} />
                            </button>
                            <button
                                onClick={() => {
                                    setPage((old) => old + 1);
                                }}
                            >
                                <img src={LeftIcon} alt=">" width={10} height={10} />
                            </button>
                        </div>
                    </div>

                    {isFetching && <div>Loading..</div>}
                    {allFiles.length == 0 && <>No Files</>}
                    {allFiles.map((el, idx) => (
                        <div className={styles.fileInList} key={idx}>
                            <button
                                onClick={() => {
                                    onRemove(el);
                                }}
                            >
                                <img src={CloseIcon} alt="" width={10} height={10} />
                            </button>
                            {el._id}:
                            <a href={API_ENDPOINT + URL_FILES + '/' + el._id} className={styles.link} target="_blank" style={{ marginRight: '5px' }}>
                                {decodeURIComponent(el.fileName)}
                            </a>
                            <button
                                onClick={() => {
                                    onEdit(el);
                                }}
                            >
                                <img src={EditIcon} alt="" width={10} height={10} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.aside}>
                    <p>Выберете файлы для загрузки, нажмите Загрузить</p>
                    <div className={styles.descrtiptionText}>
                        - максимальный размер файла установлен на ~15Мб ), <br />
                        - русских букв в имени не больше ~43, <br />
                        - можно загружать много файлов сразу, <br />
                        - формат файлов любой, <br />
                        - ссылка на загруженный файл, доступна сразу <br />- что не получится загрузить:{' '}
                        <span className={styles.red}>будет красное</span> <br />
                    </div>
                    <div>
                        <input type="file" onChange={onFileChange} multiple={true} />
                    </div>
                    {fileData()}
                    {!!selectedFiles.length && (
                        <button onClick={handleSetFormData} disabled={!!blockUpload}>
                            Загрузить
                        </button>
                    )}
                    <div className={styles.status}>
                        {!!lastUploadStatus && (
                            <div>
                                Status: {lastUploadStatus.status}, {lastUploadStatus.statusText}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
