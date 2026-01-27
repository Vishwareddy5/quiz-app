package com.telusko.quizApp.Controller;

import com.telusko.quizApp.Service.QuestionService;
import com.telusko.quizApp.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @GetMapping("allquestions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("category/{cat}")
    public ResponseEntity<List<Question>> getCategoryQuestions(@PathVariable String cat) {
        String category_name = cat;
        return questionService.getCategoryQuestions(category_name);
    }

    @GetMapping("categories")
    public ResponseEntity<List<String>> getCategories() {
        return questionService.getCategories();
    }

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestionById(@PathVariable Integer id) {
        questionService.deleteQuestionById(id);
        return ResponseEntity.ok("Question deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateQuestionById(@PathVariable Integer id, @RequestBody Question question) {
        questionService.updateQuestionById(id, question);
        return ResponseEntity.ok("Question update successfully");
    }
}





