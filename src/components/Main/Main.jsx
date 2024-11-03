import React from 'react'
import { useContext } from "react";
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)      // using these we will display our result on our main component
  
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.CV_image} alt="" />
        </div>
        <div className="main-container">
           {!showResult
           ?<>
              <div className="greet">
                <p><span>Hello, Sarang</span></p>
                <p className='helping'>How can I help you Today?</p>
              </div>
              <div className="cards">
                <div className="card">
                   <p>Suggest beautiful places to see on an upcoming road trip</p>
                   <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                   <p>Briefly summarize this concept:urban planning</p>
                   <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                   <p>Brainstorm team bonding activites for our work retreat</p>
                   <img src={assets.msg2_icon} alt="" className='msg2-card'/>
                </div>
                <div className="card">
                   <p>Improve the readability of the following code</p>
                   <img src={assets.code2} alt="" />
                </div>
              </div>
            </>
            : <div className='result'>
                  <div className="result-title">
                    <img src={assets.CV_image} alt=""  style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <p>{recentPrompt}</p>
                  </div>
                  <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                      </div>
                      : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    
                  </div>
              </div>
            }
            
            <div className="main-bottom">
              <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                  <img src={assets.gallery_icon} alt="" />
                  <img src={assets.mic_icon} alt=""  className='mic-dark'/>
                  <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                </div>
              </div>
              <p className="bottom-info">
                Gemini may display inaccurate info, including people, so double-check its rsponse. Your privacy and Gemini Apps.
              </p>
            </div>
        </div>
    </div>
  )
}

export default Main