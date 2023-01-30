import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import bookImage from  './book'
import EmojiData from './Emoji.json'
import GifData from './Gif.json'
import './BookEditor.css'

const DropDownContainer = styled("div")`
    width: 100%;
    position: relative;
    z-index: 2;
`;

const DropDownHeader = styled("div")`
    margin-bottom: 0.8em;
    padding: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 1.3rem;
    color: #3faffa;
    background: #10284b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
`;

const DropDownListContainer = styled("div")`
    position: absolute;
    width: 98%;
`;

const DropDownList = styled("ul")`
    padding: 10px;
    margin: 0;
    padding-left: 1em;
    box-sizing: border-box;
    font-weight: 500;
    background: #fff;
    color: #10284b;
    border: 0;
    box-shadow: 0 0 10px #ccc;
    font-size: 16px;
    border-radius: 10px;
`;

const ListItem = styled("li")`
    list-style: none;
    margin-bottom: 5px;
    &:last-child {
        margin-bottom: 0px;
    }
`;

const bookData = {...bookImage};

const options = bookImage.map((number) => number);


function BookEditor(){

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0].name);
    const [selectedImage, setSelectedImage] = useState(options[0].data);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value, key) => {
        setSelectedOption(value);
        setIsOpen(false);
        setActiveImg('');
        setSelectedImage(options[key-1].data);
    };

    const [activeImg, setActiveImg] = useState('');

    const [centerImg, setCenterImg] = useState('');

    const [whiteImg, setWhiteImg]  = useState([<div className="img"><span>1</span></div>]);

    const [updatedLeftImg, setUpdatedLeftImg]  = useState([]);

    const isActive = (id, url) => {
        setActiveImg(id);
        setCenterImg(url);
    }
    
    const [leftImg, setleftImg] = useState('');

    const [countLeftImg, setCountLeftImg] = useState(1);

    const addNewPage = () => {
        setleftImg(centerImg);
        setCenterImg('');        
        updateLeftImg(countLeftImg);
        setCountLeftImg(countLeftImg+1);
        setSearch('')
    }

    function updateLeftImg(count){
        setUpdatedLeftImg([...updatedLeftImg, <div className="img"><span>{count}</span><img src={centerImg} /></div>]);
    }
    
    const [search, setSearch] = useState('');
    const [eData, setEData] = useState([]);
    const [gData, setGData] = useState([]);
    useEffect(() => {
        const newData = EmojiData.filter(emoji => emoji.title.toLowerCase().includes(search.toLowerCase()));
        const newGifData = GifData.filter(gif => gif.title.toLowerCase().includes(search.toLowerCase()));
        setEData(newData);
        setGData(newGifData);
    }, [search])

    return(
        <>
            <div className="main_wrap">
                <div className="container">
                    <div className="top">
                        <div className="logo">
                            <img src="/assets/img/BriBooks.svg" />
                        </div>                    
                        <div className="buttons">
                            <button className="btn btn-primary">
                                <img src="/assets/img/img.png" />
                                <span>Change Theme</span>
                            </button>

                            <button className="btn btn-primary btn-user">
                                <div>
                                    <img src="/assets/img/profile.png" />
                                    <span>Noah Behl</span>
                                </div>
                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    

                    <div className="center">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="l_side">
                                    <div className="top_s">
                                        <div className="left_temp">
                                            {updatedLeftImg == '' 
                                                ? whiteImg
                                                : updatedLeftImg
                                            }
                                        </div>  
                                        <div className="main_temp">
                                            <div className="main_temp_img">
                                                {centerImg == '' 
                                                    ? ''
                                                    : 
                                                    <>
                                                        <div id="postIt">                                                    
                                                            <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Start typing here" />

                                                            {search == '' ? '' :
                                                                <div className="suggestion_box">
                                                                    <h4>Emoji</h4>
                                                                    <ul>
                                                                        
                                                                        {eData.map(emoji => <li>{emoji.symbol}</li>)}
                                                                    </ul>
                                                                    <h4>Gif</h4>
                                                                    <ul>
                                                                        {gData.map(gif => {
                                                                            return(
                                                                                <>
                                                                                    <li> 
                                                                                        <div className="img">
                                                                                            <img src={gif.url} />            
                                                                                        </div>
                                                                                    </li>
                                                                                </>  
                                                                            );
                                                                        })}     
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </div>
                                                        <img id="center_img" src={centerImg} />
                                                    </>
                                                }
                                                
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div className="bottom_s">
                                        <div className="buttons">
                                            <button className="btn btn-primary btn-help">
                                                <img src="/assets/img/robot.png" />
                                                <span>Help Me</span>
                                            </button>

                                            <button className="btn btn-primary btn-review">
                                                <img src="/assets/img/eye.png" />
                                                <span>Book Review</span>
                                            </button>

                                            <button className="btn btn-primary" onClick={addNewPage}>
                                                <img src="/assets/img/plus.png" />
                                                <span>Add New Page</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="r_side">
                                    <div className="card">
                                        <div className="card-header">
                                            <p>Change Background</p>
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>

                                        <div className="card-body">
                                            <div className="row g-2">
                                                
                                                <DropDownContainer>
                                                    <DropDownHeader onClick={toggling}>
                                                        {selectedOption}
                                                        <span><i className="fa fa-caret-down" aria-hidden="true"></i></span>
                                                    </DropDownHeader>
                                                    {isOpen && (
                                                        <DropDownListContainer>
                                                            <DropDownList>
                                                                {options.map((option, i) => {
                                                                    return(
                                                                        <ListItem onClick={e=>onOptionClicked(e.target.textContent, option.id)} key={i} id={option.id}>
                                                                            {option.name}
                                                                        </ListItem>
                                                                    );
                                                                })}
                                                            </DropDownList>
                                                        </DropDownListContainer>
                                                    )}
                                                </DropDownContainer>
                                                {selectedImage.map((item, i) => {
                                                    return(
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className={ i+1 == activeImg ? 'template active' : 'template'} onClick={e => isActive(item.imgId, item.img_url)} >
                                                                <img src={item.img_url} width=""  height="" alt=""/>
                                                            {
                                                                i+1 == activeImg ? <i className="fa fa-check" aria-hidden="true"></i>: ''
                                                            }
                                                            </div>
                                                        </div>  
                                                    );
                                                })}
                                                                                 
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <button className="btn btn-primary">
                                                Upload A Custom Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookEditor;
