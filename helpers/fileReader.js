import fs  from "fs";

const readFileSync = ( filePath) => {
    try{  
        const file = fs.readFileSync(filePath, "utf-8");
        return file;
        
    }catch(e){
        consle.log(e.message)
    }

}

export default  readFileSync;