import style from './ProfileOrders.module.css'
import {OrderCard} from "../../components/OrderCard/OrderCard";

export const ProfileOrdersPage = () => {
    const testObject = {
        createdAt: "2022-11-16T11:44:17.370Z",
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733c7'],
    name: "Spicy флюоресцентный бургер",
    number: 30302,
    status: "done",
    updatedAt: "2022-11-16T11:44:17.767Z",
    _id: "6374cd119b518a001bb845cd",
}
    return (
        <div className={style.myorders__wrapper}>
            <OrderCard order={testObject} isOwner={true}></OrderCard>
            <OrderCard order={testObject} isOwner={true}></OrderCard>
            <OrderCard order={testObject} isOwner={true}></OrderCard>
            <OrderCard order={testObject} isOwner={true}></OrderCard>
            <OrderCard order={testObject} isOwner={true}></OrderCard>


        </div>
    )
}