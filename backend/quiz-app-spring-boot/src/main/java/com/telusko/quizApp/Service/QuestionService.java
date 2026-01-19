package com.telusko.quizApp.Service;

import com.telusko.quizApp.dao.QuestionDao;
import com.telusko.quizApp.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<List<Question>> getAllQuestions(){
        try {
            List<Question> questions = questionDao.findAll();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Question>> getCategoryQuestions(String category_name){
        try{
            return new ResponseEntity<>(questionDao.findByCategory(category_name),HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> addQuestion(Question question) {
        questionDao.save(question);
        return new ResponseEntity<>("Success",HttpStatus.CREATED);
    }

    public void deleteQuestionById(Integer id) {
        if(!questionDao.existsById(id)){
            throw new RuntimeException("Question not Found with Id "+id);
        }
        questionDao.deleteById(id);
    }

    public void updateQuestionById(Integer id,Question question) {
        Question existingQuestion = questionDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        // Updating fields explicitly
        existingQuestion.setQuestionTitle(question.getQuestionTitle());
        existingQuestion.setOption1(question.getOption1());
        existingQuestion.setOption2(question.getOption2());
        existingQuestion.setOption3(question.getOption3());
        existingQuestion.setOption4(question.getOption4());
        existingQuestion.setRightAnswer(question.getRightAnswer());
        existingQuestion.setDifficultyLevel(question.getDifficultyLevel());
        existingQuestion.setCategory(question.getCategory());

        questionDao.save(existingQuestion);
    }
}
