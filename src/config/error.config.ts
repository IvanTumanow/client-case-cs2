import type {IError} from "@/shared/types/error.types.ts";

class errorConfig {
    DEFAULT: IError = {
        title: 'Ошибка',
        message: 'Возникла непредвиденная ошибка',
    }
}

export const ERROR_CONFIG = new errorConfig()