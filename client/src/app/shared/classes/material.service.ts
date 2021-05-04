import { ElementRef, Injectable } from "@angular/core";
declare var M: any

export interface IModal {
    open(): void
    close(): void
    destroy(): void
}

export interface DatePicker extends IModal {
    date?: Date
}

@Injectable({
    providedIn: 'root'
})
export class MaterialService {

    toast(message: string, type?: string) {
        M.toast({ html: message, classes: `rounded ${type === 'success' ? 'green accent-4' : ''}`, displayLength: 5000 })
    }

    dismissToasts() {
        M.Toast.dismissAll();
    }

    initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement)
    }

    updateTextInput() {
        M.updateTextFields()
    }

    initModal(ref: ElementRef) {
        return M.Modal.init(ref.nativeElement)
    }

    initTooltip(ref: ElementRef) {
        return M.Tooltip.init(ref.nativeElement)
    }

    initDatePicker(ref: ElementRef, onClose: () => void) {
        return M.Datepicker.init(ref.nativeElement, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            onClose
        })
    }

    initTapTarget(ref: ElementRef) {
        return M.TapTarget.init(ref.nativeElement)
    }
}