package qmanager

import (
	"fmt"
	"sync"
	"time"
)

const (
	PriorityType string = "SP"
	GeneralType         = "SG"
	ExamType            = "SE"
)

type Ticket struct {
	Number    string     `json:"number"`
	Type      string     `json:"type"`
	CreatedAt *time.Time `json:"created_at"`
	CalledAt  *time.Time `json:"called_at"`
}

type QueueManager struct {
	sync.Mutex
	queues    map[string][]Ticket
	calls     []Ticket
	sequences map[string]int
}

func New() *QueueManager {
	qm := QueueManager{
		queues: map[string][]Ticket{
			PriorityType: make([]Ticket, 0), // priority queue
			GeneralType:  make([]Ticket, 0), // general queue
			ExamType:     make([]Ticket, 0), // exam queue
		},
		calls:     make([]Ticket, 0),
		sequences: map[string]int{PriorityType: 0, GeneralType: 0, ExamType: 0},
	}
	return &qm
}

func (qm *QueueManager) Queue(ticketType string) ([]Ticket, error) {
	qm.Lock()
	defer qm.Unlock()
	if _, ok := qm.queues[ticketType]; ok {
		return qm.queues[ticketType], nil
	}
	return nil, fmt.Errorf("Invalid ticket type: %v", ticketType)
}

func (qm *QueueManager) NewTicket(ticketType string) (Ticket, error) {
	qm.Lock()
	defer qm.Unlock()
	if _, ok := qm.queues[ticketType]; ok {
		createTime := time.Now()
		qm.sequences[ticketType]++
		ticket := Ticket{
			Number:    ticketNumber(createTime, ticketType, qm.sequences[ticketType]),
			Type:      ticketType,
			CreatedAt: &createTime,
		}
		qm.queues[ticketType] = pushBack(qm.queues[ticketType], ticket)
		return ticket, nil
	}
	return Ticket{}, fmt.Errorf("Invalid ticket type: %v", ticketType)
}

func (qm *QueueManager) CallNext() (*Ticket, []Ticket) {
	qm.Lock()
	defer qm.Unlock()
	if len(qm.calls) == 0 || qm.calls[0].Type != PriorityType {
		if ticket, ok := qm.tryCallType(PriorityType); ok {
			return ticket, qm.calls
		}
	}
	if ticket, ok := qm.tryCallType(ExamType); ok {
		return ticket, qm.calls
	}
	if ticket, ok := qm.tryCallType(GeneralType); ok {
		return ticket, qm.calls
	}
	return nil, qm.calls
}

func (qm *QueueManager) tryCallType(ticketType string) (*Ticket, bool) {
	if q, ok := qm.queues[ticketType]; ok {
		if len(q) > 0 {
			var ticket Ticket
			ticket, qm.queues[ticketType] = popFront(qm.queues[ticketType])
			calledAt := time.Now()
			ticket.CalledAt = &calledAt
			qm.calls = pushFront(qm.calls, ticket)
			return &ticket, true
		}
	}
	return nil, false
}

func ticketNumber(createTime time.Time, ticketType string, seq int) string {
	timePrefix := createTime.Format("060102")
	return fmt.Sprintf("%s-%s%d", timePrefix, ticketType, seq)
}

func popFront[T any](queue []T) (T, []T) {
	ticket := queue[0]
	return ticket, queue[1:]
}

func pushFront[T any](queue []T, value T) []T {
	return append([]T{value}, queue...)
}

func pushBack[T any](queue []T, value T) []T {
	return append(queue, value)
}
