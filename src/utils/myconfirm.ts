import { ElMessageBox } from "element-plus";
export default function myconfirm(text: string) {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(
            text,
            'System massage',
            {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancle',
                type: 'warning',
            }
        ).then(() => {
            //confirm
            resolve(true)
        }).catch(() => {
            //cancle
            reject(false)
        })
    }).catch(() => {
        return false
    })
}