import { FC, memo } from 'react';
import * as icons from 'react-bootstrap-icons';

interface IIcon extends icons.IconProps {
    iconName: keyof typeof icons;
}

const Icon : FC<IIcon> = memo(({iconName, ...props}) => {
    const IconComponent = icons[iconName];
    return <IconComponent {...props} /> ;
});

export default Icon;