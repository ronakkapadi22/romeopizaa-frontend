import React from 'react'
import { ReactComponent as Logo } from '../assets/images/logo_white.svg'
import { ReactComponent as HeaderLogo } from '../assets/images/header_logo.svg'
import { ReactComponent as IconLogo } from '../assets/images/logo-large.svg'
import { ReactComponent as Cart } from '../assets/icons/cart-fill.svg'
import { ReactComponent as ArrowLeft } from '../assets/icons/outline/arrow-left.svg'
import { ReactComponent as ArrowRight } from '../assets/icons/outline/arrow-right.svg'
import { ReactComponent as ArrowTop } from '../assets/icons/outline/arrow-up.svg'
import { ReactComponent as ArrowDown } from '../assets/icons/outline/arrow-down.svg'
import { ReactComponent as Facebook } from '../assets/icons/social/facebook.svg'
import { ReactComponent as LinkedIn } from '../assets/icons/social/linkedin.svg'
import { ReactComponent as Twitter } from '../assets/icons/social/twitter.svg'
import { ReactComponent as Telegram } from '../assets/icons/social/telegram.svg'
import { ReactComponent as Phone } from '../assets/icons/telephone-fill.svg'
import { ReactComponent as Timer } from '../assets/icons/clock-fill.svg'
import { ReactComponent as Email } from '../assets/icons/email.svg'
import { ReactComponent as Calender } from '../assets/icons/calendar.svg'
import { ReactComponent as Search } from '../assets/icons/outline/search.svg'
import { ReactComponent as Pizaa } from '../assets/category/pizaa.svg'
import { ReactComponent as Burger } from '../assets/category/burger.svg'
import { ReactComponent as Chicken } from '../assets/category/chicken.svg'
import { ReactComponent as FrenchFries } from '../assets/category/french-fries.svg'
import { ReactComponent as Dessert } from '../assets/category/dessert.svg'
import { ReactComponent as Sandwich } from '../assets/category/sandwich.svg'
import { ReactComponent as Pen } from '../assets/icons/outline/pencil.svg'
import { ReactComponent as StarFilled } from '../assets/icons/star-fill.svg'
import { ReactComponent as HeartOutline } from '../assets/icons/outline/like.svg'
import { ReactComponent as Location } from '../assets/icons/location.svg'
import { ReactComponent as Discount } from '../assets/icons/discount-orange.svg'
import { ReactComponent as Menu } from '../assets/icons/list.svg'
import { ReactComponent as Close } from '../assets/icons/outline/close.svg'
import { ReactComponent as TextFill } from '../assets/icons/text-fill.svg'
import { ReactComponent as BorderWidth } from '../assets/icons/border-width.svg'
import { ReactComponent as Profile } from '../assets/icons/profile.svg'
import { ReactComponent as ThreeDots } from '../assets/icons/outline/three-dots.svg'
import { ReactComponent as Plus } from '../assets/icons/outline/add.svg'
import { ReactComponent as Minus } from '../assets/icons/outline/minus.svg'
import { ReactComponent as Human } from '../assets/icons/accessibility.svg'
import { ReactComponent as Card } from '../assets/icons/card-fill.svg'
import { ReactComponent as LocationOutline } from '../assets/icons/outline/location.svg'
import { ReactComponent as ArrowRightLine } from '../assets/icons/outline/mark-right.svg'
import { ReactComponent as ProfileIcon } from '../assets/images/profile.svg'
import { ReactComponent as Show } from '../assets/icons/eye.svg'
import { ReactComponent as Hide } from '../assets/icons/eye-close.svg'
import { ReactComponent as Trash } from '../assets/icons/trash.svg'
import { ReactComponent as HeartFill } from '../assets/icons/like-fill.svg'
import { ReactComponent as EmptyCart } from '../assets/images/empty-cart.svg'
import { ReactComponent as Loading } from '../assets/images/loading.svg'
import { ReactComponent as Check } from '../assets/icons/check.svg'
import { ReactComponent as Warning } from '../assets/icons/warning.svg'

const Icons = ({ id, ...props }) => {
	switch (id) {
		case 'logo':
			return <Logo {...props} />
		case 'empty-cart':
			return <EmptyCart {...props} />
		case 'check-right':
			return <Check {...props} />
		case 'trash':
			return <Trash {...props} />
		case 'warning':
			return <Warning {...props} />
		case 'loading':
			return <Loading {...props} />
		case 'heart-outline':
			return <HeartOutline {...props} />
		case 'heart-filled':
			return <HeartFill {...props} />
		case 'search':
			return <Search {...props} />
		case 'logo-icon':
			return <IconLogo {...props} />
		case 'header_logo':
			return <HeaderLogo {...props} />
		case 'cart':
			return <Cart {...props} />
		case 'left':
			return <ArrowLeft {...props} />
		case 'right':
			return <ArrowRight {...props} />
		case 'top':
			return <ArrowTop {...props} />
		case 'down':
			return <ArrowDown {...props} />
		case 'facebook':
			return <Facebook {...props} />
		case 'twitter':
			return <Twitter {...props} />
		case 'telegram':
			return <Telegram {...props} />
		case 'linked-in':
			return <LinkedIn {...props} />
		case 'phone':
			return <Phone {...props} />
		case 'timer':
			return <Timer {...props} />
		case 'email':
			return <Email {...props} />
		case 'calender':
			return <Calender {...props} />
		case 'pizza':
			return <Pizaa {...props} />
		case 'burger':
			return <Burger {...props} />
		case 'chicken':
			return <Chicken {...props} />
		case 'french_fries':
			return <FrenchFries {...props} />
		case 'desserts':
			return <Dessert {...props} />
		case 'sandwich':
			return <Sandwich {...props} />
		case 'pen':
			return <Pen {...props} />
		case 'star-filled':
			return <StarFilled {...props} />
		case 'location':
			return <Location {...props} />
		case 'menu':
			return <Menu {...props} />
		case 'discount-orange':
			return <Discount {...props} />
		case 'close':
			return <Close {...props} />
		case 'profile':
			return <Profile {...props} />
		case 'border-width':
			return <BorderWidth {...props} />
		case 'text-fill':
			return <TextFill {...props} />
		case 'three-dots':
			return <ThreeDots {...props} />
		case 'plus':
			return <Plus {...props} />
		case 'minus':
			return <Minus {...props} />
		case 'human':
			return <Human {...props} />
		case 'card':
			return <Card {...props} />
		case 'location-outline':
			return <LocationOutline {...props} />
		case 'arrow-right':
			return <ArrowRightLine {...props} />
		case 'profile-icon':
			return <ProfileIcon {...props} />
		case 'show':
			return <Show {...props} />
		case 'hide':
			return <Hide {...props} />
		default:
			return null
	}
}

export default Icons
