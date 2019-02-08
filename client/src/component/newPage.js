<div className="PersonalPage">
  <div className="NavigationBar">
    <div className="ButtonArea buttons">

       <a onClick={()=>{this.props.signout()}} href="#" className="btn btn-sm animated-button victoria-two nav_btn">Sign Out</a>


       <Link to='/edit' onClick={()=>{this.props.coins(this.state.coins)}} className="btn btn-sm animated-button victoria-two nav_btn">Edit Coins</Link>


       <Link className="btn btn-sm animated-button victoria-two nav_btn" to='/'>Create Bot</Link>

    </div>
    <div className="LogoArea">
      <h1>Welcome {`${this.props.username}`}</h1>
    </div>
  </div>
  <div className="ContentPersonalPage">
    <div className="LeftAreaContent">
      <div className="Table">
      </div>
      <div className="Notes">
      </div>
    </div>
    <div className="RightAreaContent">
    <Graphs coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total}/>
    </div>
  </div>
  <div className="NewsArea grid-5 center">
  {this.state.news.slice(0,5).map(singlenews=><div > <MediaCard singlenews={singlenews}/></div>)}
  </div>
</div>
  </div>
  <div className="NewsArea grid-5 center">
  {this.state.news.slice(0,5).map(singlenews=><div > <MediaCard singlenews={singlenews}/></div>)}
  </div>
</div>




<div className="PersonalPage">
  <div className="NavigationBar">
    <div className="ButtonArea buttons">
      <a onClick={()=>{this.props.signout()}} href="#" className="btn btn-sm animated-button victoria-two nav_btn">Sign Out</a>
       <Link to='/edit' onClick={()=>{this.props.coins(this.state.coins)}} className="btn btn-sm animated-button victoria-two nav_btn">Edit Coins</Link>
       <Link className="btn btn-sm animated-button victoria-two nav_btn" to='/'>Create Bot</Link>
    </div>
    <div className="LogoArea">
      <h1>Welcome {`${this.props.username}`}</h1>
    </div>
  </div>
  <div className="ContentPersonalPage">
    <div className="LeftAreaContent">
      <div className="ChartBlock">
      <ReactVirtualizedTable graph={this.get30DaysDetail} showTotal={this.showTotal} total={this.state.total} state={this.state}/>

      </div>
      <div className="ChartBlock">
      </div>
    </div>
    <div className="RightAreaContent">
    <div className="ChartBlock Chart1-2">

    <div className="Chart1">
    <Graphs1 coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total} />
    </div>
    <div className="Chart2">
    <Graphs2 coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total} />
    </div>
    </div>
    <div className="ChartBlock">
    <div className="Chart3">
    <Graphs3 coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total} />
    </div>
    </div>

    </div>
  </div>
  <div className="NewsArea grid-5 center">
  </div>
</div>




.PersonalPage {
  height: 180vh;
  background: rgba(0, 0, 0, 0.9);
  margin: 0;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.NavigationBar {
  width: 100%;
  display: flex;
}

.ButtonArea{
  display: flex;
  flex: 2;
}

.LogoArea{
  flex: 1;
  margin: auto;
}
.nav_btn{
  box-sizing: border-box;
  width:20%;
  margin: auto
}

.ContentPersonalPage{
  display: flex;
  width: 100%;
  height: 100vh;
}

.LeftAreaContent{
  flex: 1;
  background-color: red;
  display: flex;
  flex-direction: column;
}

.Table{

  height: 50%;
}
.Notes{

}

.RightAreaContent{
  justify-content: space-between;
  flex: 1;
  background-color: green;
  display: flex;
  flex-direction: column;
}


.ChartBlock{
  margin: 10px;
  height: 45%;
  box-sizing: border-box;
  background-color: yellow;
}

.Chart1-2{
  display: flex;

}

.Chart3{
  flex:1;
  position: relative;
margin:10px;
top: 0%;
left: 0%;
width: 100%;
height: 65%;
}
.Chart1{
  margin-left: 5px;
  margin-right: 5px;
    flex:1;
  height:100%;
  background-color: grey;
}
.Chart2{
  margin-left: 5px;
margin-right: 5px;
  flex:1;
  height:100%;
  background-color: grey;
}
.NewsArea{
  position: relative;
  width: 100%;
  height: 50vh;
}





























a.animated-button:link, a.animated-button:visited {
	position: relative;
	display: block;

	padding: 14px 15px;
	color: #fff;
	font-size:14px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	overflow: hidden;
	letter-spacing: .08em;
	border-radius: 0;
	text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}

a.animated-button.victoria-two {
	border: 2px solid #D24D57;
}
a.animated-button.victoria-two:after {
	background: #D24D57;
	-moz-transform: translateX(-50%) translateY(-50%) rotate(25deg);
	-ms-transform: translateX(-50%) translateY(-50%) rotate(25deg);
	-webkit-transform: translateX(-50%) translateY(-50%) rotate(25deg);
	transform: translateX(-50%) translateY(-50%) rotate(25deg);
}



a.animated-button:link, a.animated-button:visited {
	position: relative;
	display: block;

	padding: 14px 15px;
	color: #fff;
	font-size:14px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	overflow: hidden;
	letter-spacing: .08em;
	border-radius: 0;
	text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}
a.animated-button:link:after, a.animated-button:visited:after {
	content: "";
	position: absolute;
	height: 0%;
	left: 50%;
	top: 50%;
	width: 150%;
	z-index: -1;
	-webkit-transition: all 0.75s ease 0s;
	-moz-transition: all 0.75s ease 0s;
	-o-transition: all 0.75s ease 0s;
	transition: all 0.75s ease 0s;
}
a.animated-button:link:hover, a.animated-button:visited:hover {
	color: #FFF;
	text-shadow: none;
}
a.animated-button:link:hover:after, a.animated-button:visited:hover:after {
	height: 450%;
}
a.animated-button:link, a.animated-button:visited {
	position: relative;
	display: block;

	padding: 14px 15px;
	color: #fff;
	font-size:14px;
	border-radius: 0;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	overflow: hidden;
	letter-spacing: .08em;
	text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}

a.animated-button.victoria-two {
	border: 2px solid #D24D57;
}
a.animated-button.victoria-two:after {
	background: #D24D57;
	-moz-transform: translateX(-50%) translateY(-50%) rotate(25deg);
	-ms-transform: translateX(-50%) translateY(-50%) rotate(25deg);
	-webkit-transform: translateX(-50%) translateY(-50%) rotate(25deg);
	transform: translateX(-50%) translateY(-50%) rotate(25deg);
}

.buttons {
  z-index: 1;
  margin: 0auto;
  text-align: center;
  transition: all 1000ms;

}
