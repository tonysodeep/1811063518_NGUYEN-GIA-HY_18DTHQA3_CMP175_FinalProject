exports.create = function (datasource) {
    return {
        authenticate: function (username, password, callback) {
            datasource.loadAccount(function (account) {
                var success = account.username.trim() == username && account.password.trim() == password
                callback(success)
            })
        },
        getGeneralInfo: datasource.loadGeneralInfo,
        editGeneralInfo: function (info, featureImageTmpPath, callback) {
            if (info.companyNameShort == '') {
                callback('Company name short cannot be empty')
                return
            }
            if (info.companyNameLong == '') {
                callback('Company name long cannot be empty')
                return
            }
            datasource.saveGeneralInfo(info, featureImageTmpPath, function (err) {
                if (err) {
                    callback('Could not save general info')
                    return
                }
                callback(false)
            })
        },
        getAbout: datasource.loadAbout,
        editAbout: function (text, callback) {
            if (text.trim() == '') {
                callback('About text cannot be empty')
                return
            }
            datasource.saveAbout(text, function (err) {
                if (err) {
                    callback('Could not save about text')
                    return
                }
                callback(false)
            })
        },
        getProducts: datasource.loadProducts,
        addProduct: function (editProductId, name, imageTmpPath, callback) {
            if (name == '') {
                callback('Product name cannot be empty')
                return
            }
            if (editProductId == 0 && imageTmpPath == '') {
                callback('Product image cannot be empty')
                return
            }
            datasource.addProduct(editProductId, name, imageTmpPath, function (err) {
                if (err) {
                    callback('Could not add the product')
                    return
                }
                callback(false)
            })
        },
        getProduct: datasource.loadSingleProduct,   
        deleteProduct: datasource.deleteProduct,
    }
}