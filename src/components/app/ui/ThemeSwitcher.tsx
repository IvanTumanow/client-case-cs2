import {Moon, Sun} from "lucide-react";
import {useTheme} from "@/components/app/providers/ThemeProvider.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function ThemeSwitcher() {
    const {theme, setTheme} = useTheme();

    return (
        <div>
            <Button
                className={'border-0 p-0 hover:scale-125 bg-transparent'}
                variant="ghost"
                size="icon"
                title="Toggle theme"
                onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
            >
                <Sun className="bg-transparent h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="bg-transparent absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
        </div>
    )
}