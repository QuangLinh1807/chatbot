import React from 'react';
import img_icon_gray from '../../images/img-icon.png';
import { API_URL } from 'utils/constants';

export function ResponseDetailImage(props) {
    const { responseDetailItem } = props;
    return (
        <div style={{ position: 'relative' }}>
            <div className="rp-detail" style={{ backgroundColor: 'transparent' }}>
                <span className="rp-title" style={{ color: '#000' }}>
                    <img src={img_icon_gray} alt="alt" /> Hình ảnh</span>
                <img src={responseDetailItem.imageUrl != '' ? `${API_URL}${responseDetailItem.imageUrl}` : ""} alt="alt" style={{ width: '30%' }} />
            </div>

        </div>
    );
}
export default ResponseDetailImage;
