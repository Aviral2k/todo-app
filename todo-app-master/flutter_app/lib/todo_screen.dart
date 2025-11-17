import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class TodoScreen extends StatefulWidget {
  @override
  _TodoScreenState createState() => _TodoScreenState();
}

class _TodoScreenState extends State<TodoScreen> {
  final TextEditingController _controller = TextEditingController();
  bool _isAddTodoEnabled = false;

  final Map<int, String> statusLabels = {
    0: 'TODO',
    1: 'IN PROGRESS',
    2: 'DONE',
  };

  final Map<int, Color> statusColors = {
    0: Colors.red,
    1: Colors.orange,
    2: Colors.green,
  };

  void _updateTodoStatus(String docId, int currentStatus) async {
    int newStatus = (currentStatus + 1) % 3;
    await FirebaseFirestore.instance.collection('todos').doc(docId).update({
      'status': newStatus,
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Todo App'),
        backgroundColor: Colors.blue,
      ),
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: FirebaseFirestore.instance.collection('todos').snapshots(),
                builder: (context, snapshot) {
                  if (!snapshot.hasData) {
                    return Center(child: CircularProgressIndicator());
                  }
                  return ListView(
                    children: snapshot.data!.docs.map((doc) {
                      var data = doc.data() as Map<String, dynamic>;
                      int status = data['status'] ?? 0;
                      return Card(
                        margin: EdgeInsets.symmetric(vertical: 4.0),
                        child: ListTile(
                          title: Text(
                            data['title'] ?? '',
                            style: TextStyle(
                              decoration: status == 2 ? TextDecoration.lineThrough : null,
                            ),
                          ),
                          subtitle: Container(
                            margin: EdgeInsets.only(top: 8.0),
                            padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                            decoration: BoxDecoration(
                              color: statusColors[status]?.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            child: Text(
                              statusLabels[status] ?? 'UNKNOWN',
                              style: TextStyle(
                                color: statusColors[status],
                                fontWeight: FontWeight.bold,
                                fontSize: 12.0,
                              ),
                            ),
                          ),
                          trailing: IconButton(
                            icon: Icon(
                              status == 2 ? Icons.check_circle : Icons.radio_button_unchecked,
                              color: statusColors[status],
                            ),
                            onPressed: () => _updateTodoStatus(doc.id, status),
                          ),
                        ),
                      );
                    }).toList(),
                  );
                },
              ),
            ),
            if (_isAddTodoEnabled)
              Container(
                margin: EdgeInsets.only(top: 16.0),
                padding: EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Column(
                  children: [
                    TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        labelText: 'Enter todo title',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 8.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        ElevatedButton(
                          onPressed: () async {
                            if (_controller.text.isNotEmpty) {
                              await FirebaseFirestore.instance.collection('todos').add({
                                'title': _controller.text,
                                'status': 0,
                              });
                              _controller.clear();
                              setState(() {
                                _isAddTodoEnabled = false;
                              });
                            }
                          },
                          child: Text('Save'),
                        ),
                        TextButton(
                          onPressed: () {
                            _controller.clear();
                            setState(() {
                              _isAddTodoEnabled = false;
                            });
                          },
                          child: Text('Cancel'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            if (!_isAddTodoEnabled)
              Container(
                width: double.infinity,
                margin: EdgeInsets.only(top: 16.0),
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _isAddTodoEnabled = true;
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 16.0),
                  ),
                  child: Text('Add Item'),
                ),
              ),
          ],
        ),
      ),
    );
  }
}