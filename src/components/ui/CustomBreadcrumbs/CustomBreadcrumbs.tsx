import {FC, memo} from "react";
import {Link} from "react-router-dom";

export interface ICustomBreadcrumbs {
  breadcrumbsStr: string;
}

const CustomBreadcrumbs : FC<ICustomBreadcrumbs> = memo(({ breadcrumbsStr = '' }) => {
  const breadCrumbsArr = ['/', ...breadcrumbsStr.split('/').filter(bc => bc !== '')];
  let pathOfBreadcrumb = '';

  return (
    <div className={'d-flex'}>
      {breadCrumbsArr.map((bcItem, index) =>
      {
        pathOfBreadcrumb += bcItem + '/';
        return <span key={pathOfBreadcrumb}>
          <Link to={`${pathOfBreadcrumb.slice(1)}`} className={'mx-1'}>{bcItem}</Link>
          {index !== breadCrumbsArr.length - 1 && ' > '}
        </span>
      })}
    </div>
  );
});

export default CustomBreadcrumbs;