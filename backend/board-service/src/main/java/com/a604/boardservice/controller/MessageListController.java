package com.a604.boardservice.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a604.boardservice.dto.MessageListDto;
import com.a604.boardservice.service.MessageListService;

@RestController
@RequestMapping("/api/v1/room")
// @CrossOrigin(origins = "*")
public class MessageListController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private MessageListService messageListService;

	// 채팅방 불러오기
	@GetMapping("")
	public ResponseEntity<List<MessageListDto>> messageListByMemberSeq(HttpServletRequest request){
		long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());
		List<MessageListDto> messageListDtoList = new ArrayList<>();
		System.out.println("messageListByMemberSeq");
		try{
			messageListDtoList = messageListService.findMessageListByMemberSeq(memberSeq);
			return new ResponseEntity<List<MessageListDto>>(messageListDtoList, HttpStatus.OK);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<List<MessageListDto>>(messageListDtoList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 채팅방 나가기
	@PatchMapping("/{message_list_seq}")
	public ResponseEntity<String> messageListModify(HttpServletRequest request, @PathVariable("message_list_seq") long messageListSeq, @RequestBody MessageListDto messageListDto){
		long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());
		System.out.println("messageListModify");
		try{
			messageListService.modifyMessageList(memberSeq, messageListSeq, messageListDto);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
