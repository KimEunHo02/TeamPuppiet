import React from 'react';
import '../css/CalendarAlert.css';

const CalendarAlert = ({ onClose }) => {
  return (
    <div className="modal-background">
      <div className="alert-box">
        <div className="alert-content">
          <h2 id='h2text'>🐾 보상 알림 🐾</h2>
          <p>축하합니다!</p>
          <p>챌린지 스탬프 20개를 달성했어요!</p>
          <p>반려견에게 고생했다는 의미로 맛있는 간식을 선물로 주세요</p>
          <p>반려견의 건강한 삶을 위해 노력하는 당신 멋져요!</p>
        </div>
        <div className="alert-footer">
          <button onClick={onClose}
          className='buttonstyle'>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarAlert;