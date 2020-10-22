function helperAgeCount(age){
    // console.log(new Date().getFullYear())
    if(age !== 0){
        let birth_year = new Date().getFullYear() - age
        return birth_year
    } else {
        let temp = 'Unable to Count'
        return temp
    }
}


module.exports = helperAgeCount