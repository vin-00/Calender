const getColor = (type)=>{
    if(type=='work'){
      return "#4682B4";
    }
    if(type=='personal'){
      return "#4CAF50";
    }
    return "#FF9800";
}

export default getColor;