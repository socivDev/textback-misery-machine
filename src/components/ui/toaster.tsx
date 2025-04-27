
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className="group transition-all duration-500 animate-fade-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full shadow-lg backdrop-blur-sm border-amber-200 bg-amber-50/90"
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-amber-800 font-medium flex items-center gap-1.5">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-amber-700">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="hover:bg-amber-200/50 hover:text-amber-900 transition-colors" />
          </Toast>
        )
      })}
      <ToastViewport className="p-6 gap-2" />
    </ToastProvider>
  )
}
