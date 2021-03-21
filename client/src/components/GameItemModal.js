import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MODAL_GAME, SET_SRC_MODAL_GAME } from '../utils/constants'
import "./../styles/GameModal.css"; 

export default function GameItemModal(props) {
  const [modal, setModal] = useState(null);
  const exampleModal = useRef();

  useEffect(() => {
    setModal(new Modal(exampleModal.current));
  }, []);

  const [showFrameYT, setShowFrameYT] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!!modal) {
      dispatch({
        type: SET_MODAL_GAME,
        modal: modal
      });
      
      let myModalEl = document.getElementById("gameItemModal");
      myModalEl.addEventListener('hidden.bs.modal', function (event) {
        setShowFrameYT(false);
        dispatch({
          type: SET_SRC_MODAL_GAME,
          srcId: null
        });
      })
    }
  }, [modal, dispatch]);

  const {srcId} = useSelector(state => state.GameReducer.modalGameItem);
  useEffect(() => {
    if(!!srcId) {
      modal.show();
      setShowFrameYT(true);
    }
  }, [srcId,modal]);


  return (
    <div className="modal fade game-item-modal" ref={exampleModal} id="gameItemModal" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <button type="button" className="btn-close btn-close-white" onClick={() => modal.hide()} aria-label="Close"></button>
          <div className="ratio ratio-16x9">
            {
              showFrameYT && (
                <iframe
                  title="Full video"
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  src={`https://www.youtube.com/embed/${srcId}?autoplay=1&rel=0`}
                ></iframe>
              )
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
