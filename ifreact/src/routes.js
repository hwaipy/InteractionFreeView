import React from 'react';

const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));

const routes = [
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/', exact: true, name: 'Home', component: React.lazy(() => import('./views/home/Home')) },
  { path: '/dashboard', name: 'Dashboard', component: React.lazy(() => import('./views/dashboard/Dashboard')) },
  { path: '/weather', name: 'Weather', component: React.lazy(() => import('./views/weather/Weather')) },
  { path: '/lab/tfqkd/tdcviewer', name: 'TDCViewer', component: React.lazy(() => import('./views/lab/tfqkd/TDCViewer')) },
  { path: '/codeservernav', name: 'CodeServerNav', component: React.lazy(() => import('./views/codeservernav/CodeServerNav')) },
  { path: '/theme/typography', name: 'Typography', component: React.lazy(() => import('./views/theme/typography/Typography')) },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs')) },
  { path: '/base/carousels', name: 'Carousel', component: React.lazy(() => import('./views/base/carousels/Carousels')) },
  { path: '/base/collapses', name: 'Collapse', component: React.lazy(() => import('./views/base/collapses/Collapses')) },
  { path: '/base/forms', name: 'Forms', component: React.lazy(() => import('./views/base/forms/BasicForms')) },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: React.lazy(() => import('./views/base/jumbotrons/Jumbotrons')) },
  { path: '/base/list-groups', name: 'List Groups', component: React.lazy(() => import('./views/base/list-groups/ListGroups')) },
  { path: '/base/navbars', name: 'Navbars', component: React.lazy(() => import('./views/base/navbars/Navbars')) },
  { path: '/base/navs', name: 'Navs', component: React.lazy(() => import('./views/base/navs/Navs')) },
  { path: '/base/paginations', name: 'Paginations', component: React.lazy(() => import('./views/base/paginations/Pagnations')) },
  { path: '/base/popovers', name: 'Popovers', component: React.lazy(() => import('./views/base/popovers/Popovers')) },
  { path: '/base/progress-bar', name: 'Progress Bar', component: React.lazy(() => import('./views/base/progress-bar/ProgressBar')) },
  { path: '/base/switches', name: 'Switches', component: React.lazy(() => import('./views/base/switches/Switches')) },
  { path: '/base/tables', name: 'Tables', component: React.lazy(() => import('./views/base/tables/Tables')) },
  { path: '/base/tabs', name: 'Tabs', component: React.lazy(() => import('./views/base/tabs/Tabs')) },
  { path: '/base/tooltips', name: 'Tooltips', component: React.lazy(() => import('./views/base/tooltips/Tooltips')) },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns')) },
  { path: '/buttons/button-groups', name: 'Button Groups', component: React.lazy(() => import('./views/buttons/button-groups/ButtonGroups')) },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons')) },
  { path: '/charts', name: 'Charts', component: React.lazy(() => import('./views/charts/Charts')) },
  { path: '/icons/flags', name: 'Flags', component: React.lazy(() => import('./views/icons/flags/Flags')) },
  { path: '/icons/brands', name: 'Brands', component: React.lazy(() => import('./views/icons/brands/Brands')) },
  { path: '/notifications/badges', name: 'Badges', component: React.lazy(() => import('./views/notifications/badges/Badges')) },
  { path: '/notifications/modals', name: 'Modals', component: React.lazy(() => import('./views/notifications/modals/Modals')) },
  { path: '/notifications/toaster', name: 'Toaster', component: React.lazy(() => import('./views/notifications/toaster/Toaster')) },
  { path: '/widgets', name: 'Widgets', component: React.lazy(() => import('./views/widgets/Widgets')) },
  { path: '/users', exact: true, name: 'Users', component: React.lazy(() => import('./views/users/Users')) },
  { path: '/users/:id', exact: true, name: 'User Details', component: React.lazy(() => import('./views/users/User')) },
  { path: '/lab/tfqkd/transition/tdcviewer', exact: true, name: 'User Details', component: React.lazy(() => import('./views/lab/transition/TDCViewer')) },
  { path: '/lab/tfqkd/transition/encoding', exact: true, name: 'User Details', component: React.lazy(() => import('./views/lab/transition/Encoding')) },
  { path: '/lab/tfqkd/transition/datataking', exact: true, name: 'User Details', component: React.lazy(() => import('./views/lab/transition/DataTaking')) },
  { path: '/lab/tfqkd/tdcstatus', exact: true, name: 'User Details', component: React.lazy(() => import('./views/lab/tfqkd/TDCStatus')) },
  { path: '/lab/tfqkd/lab', exact: true, name: 'User Details', component: React.lazy(() => import('./views/lab/tfqkd/Lab')) },
  { path: '/views/components/components', exact: true, name: 'User Details', component: React.lazy(() => import('./views/components/ComponentsView')) },
];

export default routes;