import React from "react";
import Services from "../Services/Services";

const Records = () => {
    return (
        <div>
            <section className="records" style={{ overflowY: 'scroll', maxHeight: '600px' }}>
                <h3>Записи на прием</h3>
                <ul>
                    <li>
                        <p>10:00</p>
                        <p>Иванов Иван Иванович</p>
                        <p>+7 (900) 123-45-67</p>
                        <p className="status open">Открыта</p>
                        <button className="close-btn">Закрыть запись</button>
                    </li>
                    <li>
                        <p>11:00</p>
                        <p>Петрова Мария Сергеевна</p>
                        <p>+7 (910) 234-56-78</p>
                        <p className="status open">Открыта</p>
                        <button className="close-btn">Закрыть запись</button>
                    </li>
                    <li>
                        <p>12:00</p>
                        <p>Сидоров Алексей Петрович</p>
                        <p>+7 (920) 345-67-89</p>
                        <p className="status closed">Закрыта</p>
                    </li>
                </ul>
            </section>
        </div>

    )
};


export default Records;
