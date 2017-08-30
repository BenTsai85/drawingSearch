import React from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import style from './LoadingPageContainer.css'

const mapStateToProps = (state) => ({
  image: state.image.image
})

class LoadingPage extends React.PureComponent {
  constructor () {
    super()
    const sentences = [
      '最接近手繪的包包最完美',
      '照畫自然包包是絕對畫不出傳世之作的',
      '我不畫我所看見的，我畫我所知道的',
      '用一根線條去買包',
      '藝術家用腦，而不是用手去畫',
      '我們繪畫是比喻，不是模仿',
      '繪畫是人類的天性',
      '繪畫是一種使我們找到包包的假想',
      '勤奮是一條神奇的線，用它可以串起無數渴望的包包',
      '誰和我一樣會畫，誰就會和我一樣會買',
      '包包是生活，藝術是包包',
      '我絕不畫我沒見過的包包',
      '我發現包包的美，願和人分享',
      '畫出生活的包包是我最大的樂趣',
      '我們身在超級商城，眼光注視世界包包潮流',
      '筆墨亦由人品為高下',
      '不畫就沒有包',
      '離開了畫板,包包就沒有了價值'
    ]
    this.state = {
      sentence: sentences[ Math.floor(Math.random() * sentences.length) ]
    }
  }
  render () {
    return (
      <div className={style.container}>
        {
          this.props.image
          ? <img src={this.props.image} className={style.image} />
          : ''
        }
        <div>
          <ReactLoading type='bubbles' color='#444' width='25vmax' height='25vmax' delay={100} className={style.loading} />
          <div className={style.text}>{
            this.props.image
            ? this.state.sentence
            : '產生圖片中...'
          }</div>
        </div>
      </div>
    )
  }
}

export const LoadingPageContainer = connect(mapStateToProps)(LoadingPage)
