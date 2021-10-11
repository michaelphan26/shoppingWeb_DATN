import { Color } from "../../../util/enum"

export const SuccessToastStyle: Object = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderLeft:`5px solid ${Color["light-blue"]}`
}

export const InfoToastStyle: Object = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderLeft:`5px solid ${Color.black}`
}

export const ErrorToastStyle: Object = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderLeft:`5px solid ${Color.pink}`
}

export const WarningToastStyle: Object = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderLeft:`5px solid ${Color.pink}`
}

export const iconStyle: Object = {
    marginLeft: 5,
    marginRight: 10
}
