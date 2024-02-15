import classNames from "classnames"
import { FcBullish } from "react-icons/fc"
import { Link } from "react-router-dom"
import { DSASHBOARD_SIDEBAR_LINKS } from "../../lib/constants/navigation"


const linkClasses = "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sn text-base"
function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 text-lg">OpenShop</span>
      </div>
      <div className="flex-1">
        {DSASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SiderbarLink key={item.key} item={item} />
        ))}
      </div>
      <div>bottom part</div>
    </div>
  )
}

function SiderbarLink({item}) {
  return (
    <Link className={classNames("text-white", linkClasses)} to={item.path}>
      <span className="text-xl">{item.icon}</span>{item.label}
    </Link>
  )
}


export default Sidebar