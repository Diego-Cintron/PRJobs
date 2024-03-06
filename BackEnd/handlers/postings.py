from flask import jsonify
from dao.postings import PostingsDAO


class PostingsHandler:

    def build_posting_dict(self, row):
        result = {}
        result['post_id'] = row[0]
        result['user_id'] = row[1]
        result['cm_id'] = row[2]
        result['post_title'] = row[3]
        result['post_description'] = row[4]
        result['post_address'] = row[5]
        result['post_municipality'] = row[6]
        result['post_uploaded'] = row[7]
        result['post_expires'] = row[8]
        return result
    

    def build_posting_attributes(self, post_id, user_id, cm_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires):
        result = {}
        result['post_id'] = post_id
        result['user_id'] = user_id
        result['cm_id'] = cm_id
        result['post_title'] = post_title
        result['post_description'] = post_description
        result['post_address'] = post_address
        result['post_municipality'] = post_municipality
        result['post_uploaded'] = post_uploaded
        result['post_expires'] = post_expires
        return result
    

    def getAllPostings(self):
        dao = PostingsDAO()
        postings_list = dao.getAllPostings()
        result_list = []
        for row in postings_list:
            result = self.build_posting_dict(row)
            result_list.append(result)
        return jsonify(Postings=result_list)
    

    def getPostingById(self, post_id):
        dao = PostingsDAO()
        row = dao.getPostingById(post_id)
        if not row:
            return jsonify(Error="Posting Not Found"), 404
        else:
            posting = self.build_posting_dict(row)
        return jsonify(Posting=posting)
    
    
    def getPostingByUserId(self, user_id):
        dao = PostingsDAO()
        postings_list = dao.getPostingsByUserId(user_id)
        result_list = []
        for row in postings_list:
            result = self.build_posting_dict(row)
            result_list.append(result)
        return jsonify(Postings=result_list) 


    def getPostingByCompanyId(self, cm_id):
        dao = PostingsDAO()
        postings_list = dao.getPostingsByCompanyId(cm_id)
        result_list = []
        for row in postings_list:
            result = self.build_posting_dict(row)
            result_list.append(result)
        return jsonify(Postings=result_list)    


    def updatePosting(self, post_id, form):
        dao = PostingsDAO()
        if not dao.getPostingById(post_id):
            return jsonify(Error = "Posting Not Found"), 404
        else:
            if len(form) != 8:
                return jsonify(Error="Malformed update request"), 404
            else:
                user_id = form['user_id']
                cm_id = form['cm_id']
                post_title = form['post_title']
                post_description = form['post_description']
                post_address = form['post_address']
                post_municipality = form['post_municipality']
                post_uploaded = form['post_uploaded']
                post_expires = form['post_expires']
                if user_id and cm_id and post_title and post_description and post_address and post_municipality and post_uploaded and post_expires:
                    dao.update(post_id, user_id, cm_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires)
                    result = self.build_posting_attributes(post_id, user_id, cm_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires)
                    return jsonify(Posting=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400


    def insertPosting(self, form):
        if len(form) != 8:
            return jsonify(Error="Malformed post request"), 400
        else:
            user_id = form['user_id']
            cm_id = form['cm_id']
            post_title = form['post_title']
            post_description = form['post_description']
            post_address = form['post_address']
            post_municipality = form['post_municipality']
            post_uploaded = form['post_uploaded']
            post_expires = form['post_expires']
            if user_id and cm_id and post_title and post_description and post_address and post_municipality and post_uploaded and post_expires:
                dao = PostingsDAO()
                post_id = dao.insert(user_id, cm_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires)
                result = self.build_posting_attributes(post_id, user_id, cm_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires)
                return jsonify(Posting=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400
            

    def deletePosting(self, post_id):
        dao = PostingsDAO()
        if not dao.getPostingById(post_id):
            return jsonify(Error = "Posting Not Found"), 404
        else:
            dao.delete(post_id)
            return jsonify(DeleteStatus="OK"), 200