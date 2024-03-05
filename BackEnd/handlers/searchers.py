from flask import jsonify
from dao.searchers import SearchersDAO


class SearchersHandler:
    def build_searchers_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['user_region'] = row[1]
        result['schedule'] = row[2]
        result['user_address'] = row[3]
        return result


    def build_searchers_attributes(self, user_id, user_region, schedule, user_address):
        result = {}
        result['user_id'] = user_id
        result['user_region'] = user_region
        result['schedule'] = schedule
        result['user_address'] = user_address
        return result

    def getAllSearchers(self):
        dao = SearchersDAO()
        searchers_list = dao.getAllSearchers()
        result_list = []
        for row in searchers_list:
            result = self.build_searchers_dict(row)
            result_list.append(result)
        return jsonify({"Searchers" : result_list}), 200

    def getSearchersByUserId(self, user_id):
        dao = SearchersDAO()
        row = dao.getSearchersByUserId(user_id) 
        if not row:
            return jsonify(Error = "User Not Found"), 404
        else:
            searcher = self.build_searchers_dict(row)
            return jsonify({"Searcher" : searcher}), 200
        
    def getSearcherbySchedule(self, schedule):
        dao = SearchersDAO()
        row = dao.getSearcherbySchedule(schedule)
        if not row:
            return jsonify(Error="User Not Found"), 404
        else:
            searcher = self.build_searchers_dict(row)
            return jsonify(Searcher=searcher)
        
    def getSearcherbyRegion(self, user_region):
        dao = SearchersDAO()
        row = dao.getSearcherbyRegion(user_region)
        if not row:
            return jsonify(Error="User Not Found"), 404
        else:
            searcher = self.build_searchers_dict(row)
            return jsonify(Searcher=searcher)
    
    # def searchSearchers(self, args):
    #     user = args.get("user_id")
    #     dao = SearchersDAO()
    #     searchers_list = []
    #     if (len(args) == 1) and user:
    #         searchers_list = dao.getSearchersByUserId(user)
    #     else:
    #         return jsonify(Error = "Malformed query string"), 400
    #     result_list = []
    #     for row in searchers_list:
    #         result = self.build_searchers_dict(row)
    #         result_list.append(result)
    #     return jsonify(Searchers=result_list)

    def insertSearchers(self, form):
        print("form: ", form)
        if len(form) != 4:
            return jsonify(Error = "Malformed post request"), 400
        else:
            user_region = form['user_region']
            schedule = form['schedule']
            user_address = form['user_address']
            if user_region and schedule and user_address:
                dao = SearchersDAO()
                user_id = dao.insert(user_region, schedule, user_address)
                result = self.build_searchers_attributes(user_id, user_region, schedule, user_address)
                return jsonify(Searcher=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400

    # def insertMessageJson(self, json):
    #     user_region = json['user_region']
    #     schedule = json['schedule']
    #     user_address = json['user_address']
    #     if user_region and schedule and user_address:
    #         dao = SearchersDAO()
    #         user_id = dao.insert(user_region, schedule, user_address)
    #         result = self.build_searchers_attributes(user_id, user_region, schedule, user_address)
    #         return jsonify(Searcher=result), 201
    #     else:
    #         return jsonify(Error="Unexpected attributes in post request"), 400

    def deleteSearchers(self, user_id):
        dao = SearchersDAO()
        if not dao.getSearchersByUserId(user_id):
            return jsonify(Error = "User not found."), 404
        else:
            dao.delete(user_id)
            return jsonify(DeleteStatus = "OK"), 200

    def updateSearchers(self, user_id, form):
        dao = SearchersDAO()
        if not dao.getSearchersByUserId(user_id):
            return jsonify(Error = "User not found."), 404
        else:
            if len(form) != 4:
                return jsonify(Error="Malformed update request"), 400
            else:
                user_region = form['user_region']
                schedule = form['schedule']
                user_address = form['user_address']
                if user_region and schedule and user_address:
                    dao = SearchersDAO()
                    user_id = dao.insert(user_region, schedule, user_address)
                    result = self.build_searchers_attributes(user_id, user_region, schedule, user_address)
                    return jsonify(Searcher=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400
    
            
