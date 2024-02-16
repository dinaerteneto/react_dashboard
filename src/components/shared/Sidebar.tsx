import classNames from 'classnames'
import { FcBullish } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { DSASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants/navigation'

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sn text-base'
function Sidebar() {
    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-100 text-lg">OpenShop</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {DSASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SiderbarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="fle flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SiderbarLink key={item.key} item={item} />
                ))}
            </div>
        </div>
    )
}

function SiderbarLink({ item }) {
    const { pathname } = useLocation()

    let linkClassesConditional = classNames(
        pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
        linkClasses
    )

    if (item.key == 'logout') {
        linkClassesConditional = classNames('text-red-500', linkClasses)
    }

    return (
        <Link className={linkClassesConditional} to={item.path}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default Sidebar
