export interface CameraDevice {
    id: string;
    label: string;
}


/**
 * Code formats supported by this library.
 */
enum Html5QrcodeSupportedFormats {
    QR_CODE = 0,
    AZTEC,
    CODABAR,
    CODE_39,
    CODE_93,
    CODE_128,
    DATA_MATRIX,
    MAXICODE,
    ITF,
    EAN_13,
    EAN_8,
    PDF_417,
    RSS_14,
    RSS_EXPANDED,
    UPC_A,
    UPC_E,
    UPC_EAN_EXTENSION,
}


class QrcodeResultFormat {
    // @ts-ignore
    public readonly format: Html5QrcodeSupportedFormats;
    // @ts-ignore
    public readonly formatName: string;
}


/** Detailed scan result. */
export interface QrcodeResult {
    /** Decoded text. */
    text: string;


    /** Format that was successfully scanned. */
    format?: QrcodeResultFormat;
}


/** QrCode result object. */
export interface Html5QrcodeResult {
    decodedText: string;
    result: QrcodeResult;
}