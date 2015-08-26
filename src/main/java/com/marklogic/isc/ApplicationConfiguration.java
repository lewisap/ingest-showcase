package com.marklogic.isc;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import com.marklogic.client.*;
import com.marklogic.client.DatabaseClientFactory.Authentication;
import com.marklogic.client.document.*;
import com.marklogic.client.io.*;
import com.marklogic.client.query.*;

@RestController
@EnableAutoConfiguration
@SpringBootApplication
public class ApplicationConfiguration {

  @RequestMapping("/")
  String home() {
    return "Hello World!";
  }

  @RequestMapping("/test")
  String dbTest() {
    DatabaseClient client = DatabaseClientFactory.newClient("localhost", 8000, "admin", "admin", Authentication.DIGEST);

    // Make a document manager to work with text files.
    TextDocumentManager docMgr = client.newTextDocumentManager();

    // Define a URI value for a document.
    String docId = "/example/text.txt";

    // Create a handle to hold string content.
    StringHandle handle = new StringHandle();

    // Give the handle some content
    handle.set("A simple text document");

    // Write the document to the database with URI from docId
    // and content from handle
    docMgr.write(docId, handle);

    client.release();
    return "inserted a document?";
  }

  @RequestMapping("/search")
  String search() {
    StringBuffer buff = new StringBuffer();
    DatabaseClient client = DatabaseClientFactory.newClient("localhost", 8000, "admin", "admin", Authentication.DIGEST);

    QueryManager queryMgr = client.newQueryManager();
    StringQueryDefinition qd = queryMgr.newStringDefinition();
    qd.setCriteria("");
    StringHandle results = queryMgr.search(qd, new StringHandle().withFormat(Format.JSON));

    client.release();
    return results.get();//buff.toString();
  }

  public static void main(String[] args) throws Exception {
    SpringApplication.run(ApplicationConfiguration.class, args);
  }
}
