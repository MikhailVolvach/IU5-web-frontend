import {FC, memo} from "react";
import {Badge, Placeholder} from "react-bootstrap";
import { EBootstrapColor } from "config/enums.ts";

export interface ICustomBadge {
    cn?: string;
    bg?: EBootstrapColor;
    textColor?: EBootstrapColor;
    isPill?: boolean;
    badgeText?: string;
}

const CustomBadge : FC<ICustomBadge> = memo(({
    bg = EBootstrapColor.PRIMARY,
    textColor = EBootstrapColor.LIGHT,
    isPill = false, cn = '',
    badgeText = ''
}) => {
    return (
        <Badge className={cn} bg={bg} text={textColor} pill={isPill}>{badgeText}</Badge>
        );
})

export default CustomBadge;