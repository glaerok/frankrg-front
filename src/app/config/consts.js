export const API_ENDPOINT = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEVELOP : process.env.REACT_APP_API_ENDPOINT;
export const REFRESH_TOKEN_TTL = 11 * 60 * 60 * 1000;     // 11h
// export const SMALL_SCREEN = window.innerWidth <= 820 && window.innerHeight <= 860;
export const SMALL_SCREEN = window.innerWidth <= 850;
// export const SMALL_SCREEN = true;

export const COOKIE_EXP = (new Date()).getTime() + 30 * 24 * 3600;
export const DATETIME_HHMM_DDMMYYYY = 'HH:mm, DD.MM.YYYY';
export const DATETIME_DDMMYYYY_HHMM = 'DD.MM.YYYY, HH:mm';
export const SERVER_DATE_YYYY_MM_DD = 'YYYY-MM-DD';
export const DATE_DDMMYY = 'DD.MM.YY';
export const DDMMYYYY = 'DD.MM.YYYY';
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
export const TEXT_REGEXP = /[^а-яёa-z0-9)(\s?!,.;:-@"']/;
export const NAME_REGEXP = /^([ \-,()A-Za-zа-яёА-ЯЁ]+)$/;
export const TEXT_REVERSE_REGEXP = /[\[\](\\)`~#$%^&*_+|<>]/;
export const NO_CYR_REGEXP = /^[^а-яё]+$/iu;  //

export const NOTIFICATION_HIDE_DELAY = 5000;
export const DOCS_IN_FOOTER = 5;
export const DEFAULT_LANGUAGE = 'ru';

export const REQUEST_FIELDS = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
};
export const PUT_FIELDS = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
};

export const URL_FILES = 'files';
export const URL_FILES_LIST = 'files/list';
export const URL_FILES_UPLOAD = 'files/upload';
export const URL_FILES_REMOVE = 'files/remove';
export const URL_FILES_EDIT = 'files/edit';
