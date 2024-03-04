from flask import jsonify
from BackEnd.dao.posters import PosterDAO

class PosterHandler:

    def build_poster_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['jpost_id'] = row[1]
        result['cm_id'] = row[2]

        return result
    
    def build_poster_attributes(self, user_id, jpost_id, cm_id):
        result = {}
        result['user_id'] = user_id
        result['jpost_id'] = jpost_id
        result['cm_id'] = cm_id

        return result
    
    def getAllPosters(self):
        dao = PosterDAO()
        posters_list = dao.getAllPosters()
        result_list = []
        for row in posters_list:
            result = self.build_poster_dict(row)
            result_list.append(result)
        return jsonify({"Posters" : result_list})

    # Get Poster by UserID
    def getPosterByUserID(self, user_id):
        dao = PosterDAO()
        row = dao.getPosterByUserID(user_id)
        if not row:
            return jsonify(Error="Poster Not Found"), 404
        else:
            poster = self.build_poster_dict(row)
        return jsonify({"Poster" : poster})

    # Get Poster by Job Post ID
    def getPostersByPostID(self, jpost_id):
        dao = PosterDAO()
        row = dao.getPostersByPostID(jpost_id)
        if not row:
            return jsonify(Error="Poster Not Found"), 404
        else:
            poster = self.build_poster_dict(row)
        return jsonify({"Posters" : poster})

    # Get Poster by Company ID
    def getPostersByCompanyID(self, cm_id):
        dao = PosterDAO()
        row = dao.getPostersByCompanyID(cm_id)
        if not row:
            return jsonify(Error="Poster Not Found"), 404
        else:
            poster = self.build_poster_dict(row)
        return jsonify({"Posters" : poster})

    # Update
    def updatePoster(self, user_id, form):
        dao = PosterDAO
        if not dao.getPosterByUserID:
            return jsonify(Error = "Poster Not Found"), 404
        else:
            if len(form) != 2:
                return jsonify(Error = "Malformed Update Request"), 404
            else:
                jpost_id = form['jpost_id']
                cm_id = form['cm_id']
                if jpost_id and cm_id:
                    dao.update(jpost_id, cm_id)
                    result = self.build_poster_attributes(user_id, jpost_id, cm_id)
                    return jsonify(Poster=result), 200
                else: 
                    return jsonify(Error = "Unexpected attributes in update request"), 400

    # Insert
    def insertPoster(self, form):
        if len(form) != 2:
            return jsonify(Error = "Malformed post request"), 400
        else:
            jpost_id = form['jpost_id']
            cm_id = form['cm_id']
            if jpost_id and cm_id:
                dao = PosterDAO()
                user_id = dao.insert(jpost_id, cm_id)
                result = self.build_poster_attributes(user_id, jpost_id, cm_id)
                return jsonify(Poster=result), 200
            else: 
                return jsonify(Error = "Unexpected attributes in update request"), 400

    # Delete
    def deletePoster(self, user_id):
        dao = PosterDAO()
        if not dao.getPosterByUserID(user_id):
            return jsonify(Error = "Poster Not Found"), 404
        else: 
            dao.delete(user_id)
            return jsonify(DeleteStatus="OK"), 200