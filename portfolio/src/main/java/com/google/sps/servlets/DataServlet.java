// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.util.*; 
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import com.google.gson.Gson;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.servlets.DataServlet;



/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    static ArrayList<String> commentList = new ArrayList<String>();
  @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      
        
        Gson gson = new Gson();
        String json = gson.toJson(commentList);
    
        response.setContentType("application/json");
        response.getWriter().println(json);
        
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    // Get the input from the form.

    String text = getParameter(request, "text-input", "");


    commentList.add(text);
    System.out.println(text);
    response.sendRedirect("/index.html");
  }
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }

}

