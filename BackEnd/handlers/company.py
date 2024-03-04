from flask import jsonify
from dao.company import CompanyDAO

class CompanyHandler:

    def build_company_dict(self, row):
        result = {}
        result['cm_id'] = row[0]
        result['cm_name'] = row[1]
        result['cm_phone'] = row[2]
        result['cm_email'] = row[3]
        result['cm_description'] = row[4]

        return result
    
    def build_company_attributes(self, cm_id, cm_name, cm_phone, cm_email, cm_description):
        result = {}
        result['cm_id'] = cm_id
        result['cm_name'] = cm_name
        result['cm_phone'] = cm_phone
        result['cm_email'] = cm_email
        result['cm_description'] = cm_description

        return result
    
    def getAllCompanies(self):
        dao = CompanyDAO()
        company_list = dao.getAllCompanies()
        result_list = []
        for row in company_list:
            result = self.build_company_dict(row)
            result_list.append(result)
        return jsonify({"Companies" : result_list})
    
    def getCompanyByID(self, cm_id):
        dao = CompanyDAO()
        row = dao.getCompanyByID(cm_id)
        if not row:
            return jsonify(Error="Company Not Found"), 404
        else:
            company = self.build_company_dict(row)
        return jsonify({"Company" : company})
    
    def getCompanyByName(self, cm_name):
        dao = CompanyDAO()
        row = dao.getCompanyByName(cm_name)
        if not row:
            return jsonify(Error="Company Not Found"), 404
        else:
            company = self.build_company_dict(row)
        return jsonify(Company=company)
    
    ''' NEEDS TO BE TESTED '''
    def getCompanyNameByID(self, cm_id):
        dao = CompanyDAO()
        row = dao.getCompanyNameByID(cm_id)
        if not row:
            return jsonify(Error="Company Not Found"), 404
        else:
            company = self.build_company_dict(row)
        return jsonify(Company=company)
    
    # Update
    def updateCompany(self, cm_id, form):
        dao = CompanyDAO()
        if not dao.getCompanyByID(cm_id):
            return jsonify(Error = "Company Not Found"), 404
        else:
            if len(form) != 4:
                return jsonify(Error = "Malformed Update Request"), 404
            else:
                cm_name = form['cm_name']
                cm_phone = form['cm_phone']
                cm_email = form['cm_email']
                cm_description = form['cm_description']
                if cm_name and cm_phone and cm_email and cm_description:
                    dao.update(cm_id, cm_name, cm_phone, cm_email, cm_description)
                    result = self.build_company_attributes(cm_id, cm_name, cm_phone, cm_email, cm_description)
                    return jsonify(Company=result), 200
                else: 
                    return jsonify(Error = "Unexpected attributes in update request"), 400

    # Insert
    def insertCompany(self, form):
        if len(form) != 4:
            return jsonify(Error = "Malformed post request"), 400
        else:
            cm_name = form['cm_name']
            cm_phone = form['cm_phone']
            cm_email = form['cm_email']
            cm_description = form['cm_description']
            if cm_name and cm_phone and cm_email and cm_description:
                dao = CompanyDAO()
                cm_id = dao.insert(cm_name, cm_phone, cm_email, cm_description)
                result = self.build_company_attributes(cm_id, cm_name, cm_phone, cm_email, cm_description)
                return jsonify(Company=result), 200
            else: 
                return jsonify(Error = "Unexpected attributes in update request"), 400

    # Delete
    def deleteCompany(self, cm_id):
        dao = CompanyDAO()
        if not dao.getCompanyByID(cm_id):
            return jsonify(Error = "Company Not Found"), 404
        else: 
            dao.delete(cm_id)
            return jsonify(DeleteStatus="OK"), 200




