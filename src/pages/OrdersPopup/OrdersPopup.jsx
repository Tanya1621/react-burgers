import {useHistory} from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import {OrderInfo} from "../../components/OrderInfo/OrderInfo";
import {useEffect} from "react";


export const OrdersPopup = () => {
    const history = useHistory();

    function close() {
        history.goBack()
    }

    return (<Modal close={close}>
            <div style={{padding: '40px', boxSizing: "border-box"}}>
            <OrderInfo isPopup={true}/>
            </div>
        </Modal>
    )
}