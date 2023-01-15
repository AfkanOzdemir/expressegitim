const accessControl = (req, res, next) => {
    console.log("MiddleWare Access Controll");
    next(); // bir sonraki işleme geçmeye yarar
};
module.exports = {
    accessControl
}; //Modülü dışarıya export eder