import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface AlertMessageDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
}

export default function AlertMessageDialog({ open, setOpen, message }: AlertMessageDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="z-[9999]" >
                <DialogHeader>
                    <DialogTitle>Alert</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        OK
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
