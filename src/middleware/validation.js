const dataMethods = ['body', 'query', 'headers', 'params']
export const validation = (Schema) => {
    return (req, res, next) => {
        const validationArray = []
        dataMethods.forEach((key) => {
            if (Schema[key]) {
                const validationResult = Schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationArray.push(validationResult.error.details)
                }
            }
        })
        if (validationArray.length > 0) {
            return res.status(422).json({ message: "Validation failed", details: validationArray })
        }else{
            return next()
        }
    }
}
