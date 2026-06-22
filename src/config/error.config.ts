import type {INotification} from "@/shared/types/error.types.ts";

class errorConfig {
    DEFAULT: INotification = {
        title: 'Ошибка',
        message: 'Возникла непредвиденная ошибка',
    }
}

export const ERROR_CONFIG = new errorConfig()