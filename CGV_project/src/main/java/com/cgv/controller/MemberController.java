package com.cgv.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cgv.mapper.MemberMapper;
import com.cgv.vo.Member;

@RequestMapping("/member")
@Controller
public class MemberController {
	
	@Autowired
	private MemberMapper mapper;
	
	@GetMapping(value = "/loginForm.do")
	public String loginForm() {
		return "member/loginForm";
	}
	
	@PostMapping(value = "/loginPro.do")
	public String loginPro(HttpSession session, Member member, Model model) {
		
		Member check = mapper.checkMember(member);
		
		session.setAttribute("log", member.getId() );
		
		model.addAttribute("id", member.getId());
		model.addAttribute("check", check);
		
		return "member/loginPro";
	}
	
	@GetMapping(value = "/logout.do")
	public String logout(HttpSession session) {
		
		session.removeAttribute("log");
		
		return "member/logout";
	}
	
	@GetMapping(value = "/joinForm.do")
	public String joinForm() {
		return "member/joinForm";
	}
	
	@PostMapping(value = "/joinPro.do")
	public String joinPro(Member member , Model model) {
		
		Member check = mapper.checkMemberId(member.getId());
		
		System.out.print(check);
		
		if(check == null) {
			mapper.memberJoin(member);
		}
		
		model.addAttribute("check", check);
		
		return "member/joinPro";
	}

}
