import type {INotification} from "@/shared/types/error.types.ts";

class notificationConfig {
    ERROR: Record<string, INotification> = {
        DEFAULT: {
            title: 'Ошибка',
            message: 'Возникла непредвиденная ошибка',
        }
    }

    SUCCESS: Record<string, INotification> = {
        LOGIN: {
            title: 'Успех',
            message: 'Вход был выполнен успешно',
        },
        LOGOUT: {
            title: 'Успех',
            message: 'Вы вышли из системы',
        }
    }
}

export const NOTIFICATION_CONFIG = new notificationConfig()