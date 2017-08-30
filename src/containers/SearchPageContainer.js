import React from 'react'
import { connect } from 'react-redux'
import style from './SearchPageContainer.css'

const mapStateToProps = (state) => ({
  items: state.product.items,
  image: state.image.image,
  comment: state.product.comment,
  title: state.product.title,
  price: state.product.price
  // items: [{
  //   title: 'Dennibella 丹妮貝拉 - 永恆愛心多卡長夾-黑@#@ Dennibella 丹妮貝拉 - 永恆愛心多卡長夾-黑',
  //   price: 1224,
  //   img_url: 'https://s.yimg.com/wb/images/52FC2B838A163DB0A7C7A8A3E4190B010BD80740'
  // },
  // {
  //   title: 'Dennibella 丹妮貝拉 - 永恆愛心多卡長夾-黑@#@ Dennibella 丹妮貝拉 - 永恆愛心多卡長夾-黑',
  //   price: 1224,
  //   img_url: 'https://s.yimg.com/wb/images/52FC2B838A163DB0A7C7A8A3E4190B010BD80740'
  // }],
  // image: 'https://s.yimg.com/wb/images/52FC2B838A163DB0A7C7A8A3E4190B010BD80740'
})

class SearchPage extends React.PureComponent {
  render () {
    return (
      <div className={[style.p_mall, style.bk_].join(' ')}>
        <div id={style.smart_banner} />
        <div className={style.header}>
          <a href='/'>
            <img id={style.canvas} src='../../statics/files/painting-palette.svg' aria-hidden='true' />
          </a>
          <button className={style.cart}>購物車</button>
          <button className={[style.srch, style.open, style.msrp_ico].join(' ')}>on</button>
          <button className={style.hamb}>off</button>
          <div className={style.l_btn}><a className={[style.msrp_ico, style.back].join(' ')} href='https://tw.mall.yahoo.com' data-ylk='slk:back'>回首頁</a>
          </div>
          <a href='https://m.tw.mall.yahoo.com/' className={style.logo}><img src='https://s.yimg.com/rz/d/yahoo_shopping_zh-Hant-TW_mall_f_w_bestfit_store_2x.png' />
          </a>
          <div className={[style.left_menu, style.scrolly].join(' ')}>
            <div className={[style.my_account, style.login].join(' ')}>
              <div className={style.hd}><i /><span>lj2jg3q25j6j7s6u6xkdphevpfwurcygjnha7pt5</span><a href='https://mlogin.yahoo.com/w/login/logout?.done=https://mecsrp.paas.ec.yahoo.com/search/mall/product?p=%E5%8C%85%E5%8C%85&amp;qt=product&amp;cid=0&amp;clv=0&amp;usesearch=1'>登出</a>
              </div>
              <a href='https://m.tw.mall.yahoo.com/buyer/usertool/OrdrList' className={style.my_account_item}>
                <div className={[style.srp_ico, style.ordercheck].join(' ')} />
                <div className={style.name}>訂單查詢</div>
                <div className={style.quantity} />
              </a>
              <a href='https://tw.user.mall.yahoo.com/my/voucher/unused?mobile=1' className={style.my_account_item}>
                <div className={[style.srp_ico, style.electicket].join(' ')} />
                <div className={style.name}>我的電子票券</div>
                <div className={style.quantity} />
              </a>
              <a href='https://m.tw.mall.yahoo.com/my/ecoupon' className={style.my_account_item}>
                <div className={[style.srp_ico, style.ecoupon].join(' ')} />
                <div className={style.name}>電子折價卷</div>
                <div className={style.quantity} />
              </a>
              <a href='https://tw.user.mall.yahoo.com/my/point?tab=granted' className={style.my_account_item}>
                <div className={[style.srp_ico, style.superpoint].join(' ')} />
                <div className={style.name}>超贈點點數</div>
                <div className={style.quantity} />
              </a>
              <a href='https://m.tw.mall.yahoo.com/my/benefit' className={style.my_account_item}>
                <div className={[style.srp_ico, style.bargain].join(' ')} />
                <div className={style.name}>專屬優惠</div>
                <div className={style.quantity} />
              </a>
              <a href='https://m.tw.mall.yahoo.com/my/watchlist' className={style.my_account_item}>
                <div className={[style.srp_ico, style.prodcollect].join(' ')} />
                <div className={style.name}>商品收藏</div>
                <div className={style.quantity} />
              </a>
              <a href='https://m.tw.mall.yahoo.com/my/followupStore' className={style.my_account_item}>
                <div className={[style.srp_ico, style.storecollect].join(' ')} />
                <div className={style.name}>商店收藏</div>
                <div className={style.quantity} />
              </a>
            </div>
            <div className={style.others}>
              <div className={style.hd}>其他連結</div><a href='http://tw.mobi.yahoo.com' target='blank'>Yahoo!奇摩 首頁</a><a href='http://m.tw.buy.yahoo.com/' target='blank'>Yahoo!奇摩 購物中心</a><a href='https://m.tw.bid.yahoo.com/' target='blank'>Yahoo!奇摩 拍賣</a>
            </div>
            <div className={style.ft}><a>服務條款</a><a href='https://info.yahoo.com/privacy/tw/yahoo/'>隱私權</a>
            </div>
          </div>
          <div className={style.right_menu}>
            <div>
              <div className={style.cart_title}><span className={style.title_left}>購物車</span>
                <p className={style.loading}>載入中...</p>
              </div>
              <div className={[style.msg, style.hidden].join(' ')}>none</div>
            </div>
            <div>
              <div className={style.cart_title}><span className={style.title_left}>下次購買</span>
                <p className={style.loading}>載入中...</p>
              </div>
              <div className={[style.msg, style.hidden].join(' ')}>none</div>
            </div>
          </div>
          <div className={style.uh_searchbox}>
            <div id={style.rel_sa}>
              <a />
            </div>
          </div>
        </div>
        <div>
          <div className={style.sndRefiner_Container}>
            <div />
          </div>
          <div className={[style.mainBody, style.scrolly].join(' ')}>
            <div className={style.categoryRowRefiner} style={{overflow: 'hidden'}}>
              <div className={style.srp_cats}>
                <div className={style.srp_cats_container} style={{width: '1320px'}}>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152982533&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>鞋包/精品/配飾</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152984184&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>運動/戶外/交通</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152983922&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>居家/寢具/家具</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152983413&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>相機/手機/玩具</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152982775&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>媽咪寶貝</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152984562&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>圖書/文具/影音</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152981801&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>服飾</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=2144893522&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>日用品/醫療/寵物</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152982920&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>電腦/週邊</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152982144&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>美妝</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152983191&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>家電/視聽</span></a>
                  </div>
                  <div className={style.srp_cat}><a data-ylk='slk:cat' href='/search/mall/product?cid=152983759&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>美食/纖體/保健</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div />
            <div className={style.srp_noflagshipdd} />
            <section id={style.rfnr} className={style.srp_refiner_bar}>
              <a data-ylk='slk:cat;pn:SearchResultPage' className={style.srp_cat_refiner}>
                <div className={style.cat}><span>全部分類</span><i className={style.srp_ico} />
                </div>
                <div className={style.num}>{this.props.items.length} 筆</div>
              </a>
              <a data-ylk='slk:sort;pn:SearchResultPage' className={[style.rel, style.btn, style.query_sort].join(' ')}>
                <div className={[style.srp_ico, style.desc].join(' ')} />
                <div className={style.word}>推薦</div>
              </a>
              <a data-ylk='slk:filter;pn:SearchResultPage' className={[style.advance_refiner, style.btn]}>
                <div className={style.srp_ico} />
                <div className={style.word}>篩選</div>
              </a>
              <a data-ylk='slk:view;pn:SearchResultPage' className={[style.query_sort, style.grid, style.btn].join(' ')}>
                <div className={[style.srp_ico, style.grid].join(' ')} />
                <div className={style.word}>小圖</div>
              </a>
            </section>
            <section id={style.sr_store_dd} className={[style.srp_storedd, style.carousel].join(' ')} data-searchga-module='storedd' data-searchga-category='m_search' data-searchga-action='moduleView' data-searchga-label='storedd'>
              <ul data-searchga-action='storedd'>
                <li className={style.store} data-searchga-label='funbaobao'>
                  <a href='https://tw.mall.yahoo.com/store/funbaobao'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/tzFQA4ollGKuN_sT4RH96g--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/funbaobao-mthumb-7315xf3x0144x0144_m.jpg' alt='雨朵小舖防水包包專賣店' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>雨朵小舖防水包包專賣店</span><span className={style.store_rating}>9.6</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='nine_percent'>
                  <a href='https://tw.mall.yahoo.com/store/nine_percent'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/ln7Wn036ekInIdcqyseoKQ--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/nine_percent-mthumb-4292xf3x0144x0144_m.jpg' alt='9% 日韓包包館' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>9% 日韓包包館</span><span className={style.store_rating}>7.7</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='bagtown'>
                  <a href='https://tw.mall.yahoo.com/store/bagtown'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/kgToYwIVRNs536MHrYv5pg--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/bagtown-mthumb-3630xf3x0144x0144_m.jpg' alt='包包的家' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>包包的家</span><span className={style.store_rating}>9.6</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='aimee_bag'>
                  <a href='https://tw.mall.yahoo.com/store/aimee_bag'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/FKb2tjhX023b6y8yLO6gRw--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/aimee_bag-mthumb-3016xf3x0144x0144_m.jpg' alt='Aimee包包屋商城' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>Aimee包包屋商城</span><span className={style.store_rating}>8.4</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='88-queen'>
                  <a href='https://tw.mall.yahoo.com/store/88-queen'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/GCj.W6umtVcRa_JJoXOxeg--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/88-queen-mthumb-6656xf3x0144x0144_m.jpg' alt='5188我要包包' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>5188我要包包</span><span className={style.store_rating}>8.9</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='orange0225'>
                  <a href='https://tw.mall.yahoo.com/store/orange0225'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/DKPzsx0G5hygMobyJo9A4A--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/orange0225-mthumb-6645xf3x0144x0144_m.jpg' alt='橘子包包館' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>橘子包包館</span><span className={style.store_rating}>9.3</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='74ouncebag'>
                  <a href='https://tw.mall.yahoo.com/store/74ouncebag'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/rF4lNM9pUPaS1dy7f.Ggxw--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/74ouncebag-mthumb-0280xf3x0144x0144_m.jpg' alt='74盎司包包配件流行館' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>74盎司包包配件流行館</span><span className={style.store_rating}>9.5</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='kym'>
                  <a href='https://tw.mall.yahoo.com/store/kym'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/f/i/tw/mall/yps/m_shortcut_00.png' alt='Bag House' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>Bag House</span><span className={style.store_rating}>9.3</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='charmingbag'>
                  <a href='https://tw.mall.yahoo.com/store/charmingbag'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/ut/api/res/1.2/EOveMZSe0.CbaqpgW_k8Ug--~A/YXBwaWQ9eXR3bWFsbDtoPTE0NDtxPTkwO3c9MTQ0/http://imgcld.zenfs.com:80/ps_image_prod/mthumb/charmingbag-mthumb-4144xf3x0144x0144_m.jpg' alt='charming bag' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>charming bag</span><span className={style.store_rating}>9.5</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={style.store} data-searchga-label='cats_bag'>
                  <a href='https://tw.mall.yahoo.com/store/cats_bag'>
                    <div className={style.store_logo}><img src='https://s.yimg.com/f/i/tw/mall/yps/m_shortcut_00.png' alt='Cats BAG' />
                    </div>
                    <div className={style.store_info}>
                      <div className={style.store_title}><span className={style.store_name}>Cats BAG</span><span className={style.store_rating}>9.2</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className={[style.store, style.more].join(' ')} data-searchga-label='none'>
                  <a href='https://tw.search.mall.yahoo.com/search/mall/store?p=%E5%8C%85%E5%8C%85'>
                    <div className={style.store_info}>更多相關商店</div>
                  </a>
                </li>
              </ul>
            </section>
            <div>
              <div id={style.sr} data-ga-action='sr'>
                <section>
                  <ul className={style.list}>
                    <li className={style.item}>
                      <a id={style.myContent} className={style.content}>
                        <img id={style.myImg} className={style.img} src={this.props.image} />
                        <div className={style.info}>
                          <div className={style.wrap}>
                            <img src={this.props.comment !== 12 && this.props.comment !== 15 ? `../../statics/files/comment_${this.props.comment}.png` : `../../statics/files/comment_${this.props.comment}.gif`} id={style.myComment} />
                            <div id={style.myTitle} className={style.title}>{this.props.title}</div>
                          </div>
                        </div>
                      </a>
                      <button id={style.myHeart} className={[style.fav, style.srp_ico].join(' ')} />
                    </li>
                    {
                    this.props.items.map((item, index) =>
                      <li className={style.item} key={index}>
                        <a className={style.content}>
                          <div className={style.img} style={{backgroundImage: `url("${item.img_url}")`}} />
                          <div className={style.info}>
                            <div className={style.store}><span className={style.storename}>Yahoo</span><span className={style.rating}>8.7</span>
                            </div>
                            <div className={style.wrap}>
                              <div className={style.title}>{item.title}</div>
                              <div id={style.itemrating} className={style.rating_count}><span className={[style.star, style.srp_ico, style.full].join(' ')} /><span className={[style.star, style.srp_ico, style.full].join(' ')} /><span className={[style.star, style.srp_ico, style.full].join(' ')} /><span className={[style.star, style.srp_ico, style.full].join(' ')} /><span className={[style.star, style.srp_ico, style.full].join(' ')} />
                              </div>
                              <div>
                                <div className={style.price_group}>
                                  <div className={style.price_info}><span className={style.price}><span>${item.price.slice(0, -2)}</span></span>
                                  </div>
                                  <div><span className={style.promo_tag}>活動</span>
                                  </div>
                                </div>
                              </div><span />
                              <div className={style.store}><span className={style.storename}>Yahoo</span><span className={style.rating}>8.7</span>
                              </div>
                            </div>
                          </div>
                        </a>
                        <button className={[style.fav, style.srp_ico].join(' ')} />
                      </li>
                    )
                  }
                  </ul>
                </section>
                <div className={style.loading}>
                  <div className={style.srp_ico} />
                </div>
              </div>
              <div id={style.sdimp_srp_1}>
                <a data-ylk='itmId:p0295138764927;adType:MFF;seller:shape;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_2}>
                <a data-ylk='itmId:p0829125034815;adType:MFF;seller:his_aime;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_3}>
                <a data-ylk='itmId:p029567686703;adType:NA;seller:shape;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_4}>
                <a data-ylk='itmId:p000581818457;adType:NA;seller:runway;cat:152982533_152982567_152982587_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_5}>
                <a data-ylk='itmId:p0602120533633;adType:NA;seller:golden1028;cat:152982533_152982567_152982587_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_6}>
                <a data-ylk='itmId:p048959236815;adType:NA;seller:aimee_bag;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_7}>
                <a data-ylk='itmId:p082996506572;adType:MFC;seller:his_aime;cat:152982533_152982567_152982594_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_8}>
                <a data-ylk='itmId:p0295126570863;adType:NA;seller:shape;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_9}>
                <a data-ylk='itmId:p0602100562158;adType:NA;seller:golden1028;cat:152982533_152982567_152982587_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_10}>
                <a data-ylk='itmId:p0700125876422;adType:NA;seller:betwo;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_11}>
                <a data-ylk='itmId:p0091111813401;adType:NA;seller:angel168;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_12}>
                <a data-ylk='itmId:p0153121777498;adType:MFC;seller:m7813141;cat:152982533_152982567_152982587_0_0;videoEmb:Y;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_13}>
                <a data-ylk='itmId:p0700116364501;adType:NA;seller:betwo;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_14}>
                <a data-ylk='itmId:p0295128277174;adType:NA;seller:shape;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_15}>
                <a data-ylk='itmId:p0882130575436;adType:NA;seller:dongjing;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_16}>
                <a data-ylk='itmId:p0337112122946;adType:NA;seller:jason800205;cat:152982533_152982567_152982591_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_17}>
                <a data-ylk='itmId:p0153132495029;adType:MFC;seller:m7813141;cat:152982533_152982567_152982590_0_0;videoEmb:Y;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_18}>
                <a data-ylk='itmId:p019542871197;adType:NA;seller:sky_blue;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_19}>
                <a data-ylk='itmId:p0602108254610;adType:NA;seller:golden1028;cat:152982533_152982567_152982592_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_20}>
                <a data-ylk='itmId:p085330030173;adType:NA;seller:newstar;cat:152982533_152982567_152982587_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_21}>
                <a data-ylk='itmId:p0295130579142;adType:NA;seller:shape;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_22}>
                <a data-ylk='itmId:p0829123820457;adType:MFC;seller:his_aime;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_23}>
                <a data-ylk='itmId:p0675107875600;adType:NA;seller:taomei;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_24}>
                <a data-ylk='itmId:p0017107825714;adType:NA;seller:lifegosimple;cat:152982533_152982567_152982588_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_25}>
                <a data-ylk='itmId:p0700129676258;adType:NA;seller:betwo;cat:152982533_152982567_152982587_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_26}>
                <a data-ylk='itmId:p0824110719526;adType:NA;seller:momo;cat:152982533_152982567_152982590_0_0;videoEmb:N;imgNum:1;' />
              </div>
              <div id={style.sdimp_srp_27}>
                <a data-ylk='itmId:p0153121602627;adType:MFC;seller:m7813141;cat:152982533_152982567_152982587_0_0;videoEmb:Y;imgNum:1;' />
              </div>
            </div>
          </div>
          <div id={style.mask} className={style.hide} />
          <div className={style.srp_refiner_bar}>
            <div id={style.categoryRefiner} className={[style.category_panel, style.hide, style.list_refiner, style.scrolly].join(' ')}>
              <header><span className={style.title}>商品分類</span>
                <a data-ylk='slk:cancel' className={[style.close, style.srp_ico].join(' ')} />
              </header>
              <div className={style.parent_cat} />
              <div className={style.current}><span>全部分類</span><a data-ylk='slk:all' className={style.total} href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'>看全部</a>
              </div>
              <ul className={style.srp_cats}>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152982533&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>鞋包/精品/配飾</span><span className={style.num}>38104</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152984184&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>運動/戶外/交通</span><span className={style.num}>1709</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152983922&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>居家/寢具/家具</span><span className={style.num}>1656</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152983413&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>相機/手機/玩具</span><span className={style.num}>1118</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152982775&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>媽咪寶貝</span><span className={style.num}>977</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152984562&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>圖書/文具/影音</span><span className={style.num}>891</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152981801&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>服飾</span><span className={style.num}>419</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=2144893522&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>日用品/醫療/寵物</span><span className={style.num}>289</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152982920&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>電腦/週邊</span><span className={style.num}>207</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152982144&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>美妝</span><span className={style.num}>170</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152983191&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>家電/視聽</span><span className={style.num}>88</span></a>
                </li>
                <li><a data-ylk='slk:cat' href='/search/mall/product?cid=152983759&amp;clv=1&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;pg=1'><span className={style.name}>美食/纖體/保健</span><span className={style.num}>30</span></a>
                </li>
              </ul>
            </div>
            <section id={style.sortRefiner} className={[style.sort_panel, style.hide, style.list_refiner].join(' ')}>
              <header><span>排序</span>
                <a data-ylk='slk:cancel' className={[style.close, style.srp_ico].join(' ')} />
              </header>
              <ul className={style.sort_panel}>
                <li><a data-ylk='slk:prceLH' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;sort=p&amp;pg=1'><span className={[style.srp_ico, style.asc].join(' ')} /><span className={style.name}>價格</span><span className={style.description}>低到高</span></a>
                </li>
                <li><a data-ylk='slk:prceHL' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;sort=-p&amp;pg=1'><span className={[style.srp_ico, style.desc].join(' ')} /><span className={style.name}>價格</span><span className={style.description}>高到低</span></a>
                </li>
                <li><a data-ylk='slk:ratingcountHL' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;sort=-ratingcount&amp;pg=1'><span className={[style.srp_ico, style.desc].join(' ')} /><span className={style.name}>評論數</span><span className={style.description}>高到低</span></a>
                </li>
                <li><a data-ylk='slk:ratingHL' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;sort=-rating&amp;pg=1'><span className={[style.srp_ico, style.desc].join(' ')} /><span className={style.name}>評價</span><span className={style.description}>高到低</span></a>
                </li>
                <li><a data-ylk='slk:rlvnce' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;sort=rel&amp;pg=1'><span className={[style.srp_ico, style.desc].join(' ')} /><span className={style.name}>優先推薦</span><span className={style.description}>高到低</span><span className={[style.checked, style.srp_ico].join(' ')} /></a>
                </li>
              </ul>
            </section>
            <section id={style.advanceRefiner} className={[style.advance_panel, style.hide, style.list_refiner].join(' ')}>
              <header><span>篩選</span>
                <a data-ylk='slk:cancel' className={[style.close, style.srp_ico].join(' ')} />
              </header>
              <form action='/search/mall/product' method='get'>
                <div className={style.filters}>
                  <button className={[style.hide, style.clear_btn].join(' ')}>清除全部</button>
                  <div className={style.pricefilter}>
                    <input type='number' placeholder='最低價' className={[style.price, style.minp].join(' ')} name='minp' /><span className={[style.price, style.sep].join(' ')}> 一 </span>
                    <input type='number' placeholder='最高價' className={[style.price, style.maxp].join(' ')} name='maxp' />
                  </div>
                  <div className={style.checkfilter}>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.ship_711} name='refine' value='ship_711' />
                      <label className={style.srp_ico} htmlFor='ship_711'>7-11取貨付款</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.ship_family} name='refine' value='ship_family' />
                      <label className={style.srp_ico} htmlFor='ship_family'>全家取貨付款</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.ship_hilife} name='refine' value='ship_hilife' />
                      <label className={style.srp_ico} htmlFor='ship_hilife'>萊爾富純取貨</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.pay_zero} name='refine' value='pay_zero' />
                      <label className={style.srp_ico} htmlFor='pay_zero'>0利率</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.pay_install} name='refine' value='pay_install' />
                      <label className={style.srp_ico} htmlFor='pay_install'>可分期</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.pay_store} name='refine' value='pay_store' />
                      <label className={style.srp_ico} htmlFor='pay_store'>超商付款</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.pay_card} name='refine' value='pay_card' />
                      <label className={style.srp_ico} htmlFor='pay_card'>可刷卡</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.ship_instk} name='refine' value='ship_instk' />
                      <label className={style.srp_ico} htmlFor='ship_instk'>有現貨</label>
                    </div>
                    <div className={style.check_input}>
                      <input type='checkbox' id={style.ext_video} name='refine' value='ext_video' />
                      <label className={style.srp_ico} htmlFor='ext_video'>有影音</label>
                    </div>
                  </div>
                  <input type='hidden' name='cid' value='0' />
                  <input type='hidden' name='clv' value='0' />
                  <input type='hidden' name='qt' value='product' />
                  <input type='hidden' name='p' value='包包' />
                  <input data-ylk='slk:submit' type='submit' className={style.submit} value='確定' />
                </div>
              </form>
            </section>
            <section id={style.listTypeRefiner} className={[style.list_panel, style.list_refiner, style.hide].join(' ')}>
              <header><span>瀏覽模式</span>
                <a data-ylk='slk:cancel' className={[style.close, style.srp_ico].join(' ')} />
              </header>
              <ul className={style.sort_panel}>
                <li><a data-ylk='slk:list' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;show=list&amp;pg=1'><span className={[style.srp_ico, style.list].join(' ')} /><span className={style.name}>列表</span></a>
                </li>
                <li><a data-ylk='slk:grid' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;show=grid&amp;pg=1'><span className={[style.srp_ico, style.grid].join(' ')} /><span className={style.name}>小圖</span><span className={[style.checked, style.srp_ico].join(' ')} /></a>
                </li>
                <li><a data-ylk='slk:thumb' href='/search/mall/product?cid=0&amp;clv=0&amp;qt=product&amp;p=%E5%8C%85%E5%8C%85&amp;show=thumb&amp;pg=1'><span className={[style.srp_ico, style.thumb].join(' ')} /><span className={style.name}>大圖</span></a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export const SearchPageContainer = connect(mapStateToProps)(SearchPage)
