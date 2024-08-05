package com.project.practice.controller;

import com.project.practice.model.Event;
import com.project.practice.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")  // Adjust the origin as per your React app's URL
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // @GetMapping("/{id}")
    // public Event getEventById(@PathVariable Long id) {
    //     return eventService.getEventById(id).orElse(null);
    // }

    @GetMapping("/{userId}")
    public List<Event> getEventsByUserId(@PathVariable Long userId) {
        return eventService.getEventsByUserId(userId);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        event.setId(id);
        return eventService.saveEvent(event);
    }
}
