import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

//https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc6d2e29e0804d9f8bb43431ed20e7ab"
//dbe57b028aeb41e285a226a94865f7a7




export class News extends Component {
//   articles = [
//     {
//         source: { id: "espn-cric-info", name: "ESPN Cric Info" },
//         author: null,
//         title:
//           "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//         description:
//           "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//         url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//         urlToImage:
//           "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//         publishedAt: "2020-03-30T15:26:05Z",
//         content:
//           "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
//       },
//       {
//         source: { id: "espn-cric-info", name: "ESPN Cric Info" },
//         author: null,
//         title:
//           "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//         description:
//           "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//         url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//         urlToImage:
//           "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//         publishedAt: "2020-04-27T11:41:47Z",
//         content:
//           "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
//       },
//       {
//         source: { "id": "cbs-news", "name": "CBS News" },
//         author: "Simrin Singh",
//         title: "Every planet in the solar system to be visible in rare \"planet parade\" Wednesday - CBS News",
//         description: "The astronomical phenomenon will give skywatchers a good view of Mercury, Venus, Mars, Jupiter and Saturn with the naked eye.",
//         "url": "https://www.cbsnews.com/news/every-planet-solar-system-visible-rare-planet-parade/",
//         urlToImage: "https://assets3.cbsnewsstatic.com/hub/i/r/2022/12/28/db227569-ae8a-4bee-9010-fc2fc5fc1ce5/thumbnail/1200x630/1b5a8224ad91e0da24859c1ce41c88d9/gettyimages-460712793.jpg",
//         "publishedAt": "2022-12-29T01:00:00Z",
//         content: "The planets of the solar system will be lined up in the sky Wednesday night in an astronomical phenomenon, visible from Earth, known as a \"planet parade.\"  \r\nThe phenomenon, which was also visible Tu… [+1945 chars]"
//       },
//       {
//         source: { "id": null, "name": "CBS Sports" },
//         author: "",
//         title: "Week 17 NFL injuries: Cowboys' Micah Parsons, Tony Pollard questionable, Titans' Derrick Henry doubtful - CBS Sports",
//         description: "Breaking down the injury reports for Week 17 in the NFL",
//         url: "https://www.cbssports.com/nfl/news/week-17-nfl-injuries-cowboys-micah-parsons-tony-pollard-questionable-titans-derrick-henry-doubtful/",
//         urlToImage: "https://sportshub.cbsistatic.com/i/r/2022/12/24/2c9fd186-627b-4158-8378-2504e0eb1525/thumbnail/1200x675/a5b1ce9d3f22078e5396894a2a87ece3/derrick-henry-3-1400.jpg",
//         publishedAt: "2022-12-29T01:08:00Z",
//         content: "The NFL regular season is wrapping up, and all 32 clubs are dealing with injuries -- both big and small. Some teams like the Baltimore Ravens, Tennessee Titans and Miami Dolphins are dealing with qua… [+11093 chars]"
//       },
     
//   ];

static defaultProps = {
  country: 'in',
  pageSize: '6', 
  category: 'general'
 }

 static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string,
 }

 capitalizeFirstLetter = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
 }

  constructor(props) {
    super(props);
    console.log("i am a constructor from news component");
    this.state = {
    //   articles: this.articles,      // you can use this wen u r not fetching data from api
      articles: [],
      loading: true,
      page:1,
      totalResults: 0,

    };
    document.title =`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }

  async updateNews(){
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}` ;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json()
    this.props.setProgress(75);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);

  }

  async componentDidMount(){
    // console.log("cdm")
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}` ;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // console.log(parsedData);
    // this.setState({articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews()
  }
  handlePrevClick=async()=>{
    // console.log("Previous")
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc6d2e29e0804d9f8bb43431ed20e7ab&page=${this.state.page - 1}&pagesize=${this.props.pageSize}` ;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // console.log(parsedData);
    // this.setState({
    //     page:this.state.page - 1, 
    //     articles:parsedData.articles,
    //     loading: false
    // })
    this.setState({page:this.state.page - 1,});
    this.updateNews()
  }

  
  handleNextClick=async()=>{
    // console.log("Next");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc6d2e29e0804d9f8bb43431ed20e7ab&page=${this.state.page + 1}&pagesize=${this.props.pageSize}` ;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
        
    //     this.setState({
    //         page:this.state.page + 1, 
    //         articles:parsedData.articles,
    //         loading: false })
    // }
    this.setState({ page:this.state.page + 1,});
    this.updateNews()
  }

  fetchMoreData = async() => {
    this.setState({page:this.state.page + 1,})
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}` ;
    // this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults,
      loading: false,
    })

  };

  render() {
    return (
      <>
        {/* <div className="container my-3"> */}
        <h1 className=" text-center my-3 mt-5 pt-3" style={{margin:'35px 0px',}}>NeWs-Express -Top "{this.capitalizeFirstLetter(this.props.category)}" HeadLines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

        {/* {this.state.articles.map((elements) =>{console.log(elements)} )}   i have used this to return col-4 with different objects */}


        <div className="container">

        <div className="row">          
          {/* {!this.state.loading && this.state.articles.map((element) => { */}

          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title? element.title:" "}
                  desc={element.description? element.description: " "}
                  imgurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            )
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark"> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div> */}


      {/* </div> */}
      </>
    );
  }
}

export default News;
