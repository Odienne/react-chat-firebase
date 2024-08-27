import "./detail.css"

const Detail = () => {
    return (
        <div className="detail">
            <div className="detail__user">
                <img src="./avatar.png" alt="avatar"/>
                <h2>Kim Liu</h2>
                <p>Currently available</p>
            </div>
            <div className="detail__info">
                <div className="detail__info__options">
                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Chat settings</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                    </div>

                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Privacy / Help</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                    </div>

                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Shared pictures</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                        <div className="detail__info__options__option__pictures">
                            <div className="detail__info__options__option__pictures__picture">
                                <div className="detail__info__options__option__pictures__picture__detail">
                                    <img src="./placeholder-image.jpg" alt="placeholder"
                                         className="detail__info__options__option__pictures__picture__detail__img"/>
                                    <span>filename.png</span>
                                    <img src="./download.png" alt="download"
                                         className="detail__info__options__option__pictures__picture__detail__download"/>
                                </div>
                            </div>
                            <div className="detail__info__options__option__pictures__picture">
                                <div className="detail__info__options__option__pictures__picture__detail">
                                    <img src="./placeholder-image.jpg" alt="placeholder"
                                         className="detail__info__options__option__pictures__picture__detail__img"/>
                                    <span>filename.png</span>
                                    <img src="./download.png" alt="download"
                                         className="detail__info__options__option__pictures__picture__detail__download"/>
                                </div>
                            </div>

                            <div className="detail__info__options__option__pictures__picture">
                                <div className="detail__info__options__option__pictures__picture__detail">
                                    <img src="./placeholder-image.jpg" alt="placeholder"
                                         className="detail__info__options__option__pictures__picture__detail__img"/>
                                    <span>filename.png</span>
                                    <img src="./download.png" alt="download"
                                         className="detail__info__options__option__pictures__picture__detail__download"/>
                                </div>
                            </div>
                            <div className="detail__info__options__option__pictures__picture">
                                <div className="detail__info__options__option__pictures__picture__detail">
                                    <img src="./placeholder-image.jpg" alt="placeholder"
                                         className="detail__info__options__option__pictures__picture__detail__img"/>
                                    <span>filename.png</span>
                                    <img src="./download.png" alt="download"
                                         className="detail__info__options__option__pictures__picture__detail__download"/>
                                </div>
                            </div>
                            <div className="detail__info__options__option__pictures__picture">
                                <div className="detail__info__options__option__pictures__picture__detail">
                                    <img src="./placeholder-image.jpg" alt="placeholder"
                                         className="detail__info__options__option__pictures__picture__detail__img"/>
                                    <span>filename.png</span>
                                    <img src="./download.png" alt="download"
                                         className="detail__info__options__option__pictures__picture__detail__download"/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="detail__info__options__option">
                        <div className="detail__info__options__option__title">
                            <span>Shared files</span>
                            <img src="./arrowUp.png" alt="arrowUp"/>
                        </div>
                    </div>

                </div>
                <button className="detail__info__blockUser">Block user</button>
                <button className="detail__info__logout">Logout</button>
            </div>
        </div>
    );
};

export default Detail;
