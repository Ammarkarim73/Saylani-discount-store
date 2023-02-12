import React from "react";
const Order = () => {
    return (
        <>
            <div className='admin_order_main_div'>
                <h3 className='order_h3'>Orders</h3>
                <div className="order_inner_div">
                    <h3 className='user_name'>Nawaz-uddin</h3>
                    <div className="status_div">
                        <p> Just Now - Pending</p>
                        <p>03208908424</p>
                    </div>
                    <div className="item_name_div">
                        <p>2 x ITEM NAME</p>
                        <p>3 x ITEM NAME </p>
                    </div>
                    <div className="items_total_div">
                        <p><b>Total</b></p>
                        <p className="item_price" >$185</p>
                    </div>
                    <div className='inputs_div2'>
                        <select className='inp select_inp ' name="cars" id="cars">
                            <option value="volvo" className="select_inp" >Change status</option>
                            <option value="saab" className="select_inp" >Saab</option>
                            <option value="mercedes" className="select_inp" >Mercedes</option>
                            <option value="audi" className="select_inp" >Audi</option>
                        </select>
                    </div>
                </div>
                <div className="order_inner_div">
                    <h3 className='user_name'>Nawaz-uddin</h3>
                    <div className="status_div">
                        <p> Just Now - Pending</p>
                        <p>03208908424</p>
                    </div>
                    <div className="item_name_div">
                        <p>2 x ITEM NAME</p>
                        <p>3 x ITEM NAME </p>
                    </div>
                    <div className="items_total_div">
                        <p><b>Total</b></p>
                        <p className="item_price" >$185</p>
                    </div>
                    <div className='inputs_div2'>
                        <select className='inp select_inp ' name="cars" id="cars">
                            <option value="volvo" className="select_inp" >Change status</option>
                            <option value="saab" className="select_inp" >Saab</option>
                            <option value="mercedes" className="select_inp" >Mercedes</option>
                            <option value="audi" className="select_inp" >Audi</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Order