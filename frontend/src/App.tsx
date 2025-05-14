import './App.css';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function App() {
  const [show, setShow] = useState(false);          // 新規追加モーダル
  const [showMemo, setShowMemo] = useState(false);  // 編集モーダル
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [memos, setMemos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // 編集中のメモのインデックス

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseMemo = () => setShowMemo(false);
  const handleShowMemo = () => setShowMemo(true);

  const handlePush = (event) => {
    event.preventDefault();

    const newMemo = { title, text };
    setMemos([...memos, newMemo]);

    setTitle('');
    setText('');
    setShow(false);
  };

  // 編集用モーダルを開く
  const handleMemoOpen = (index) => {
    setEditIndex(index);
    setTitle(memos[index].title);
    setText(memos[index].text);
    handleShowMemo();
  };

  // 編集内容を保存
  const handleSaveEdit = () => {
    const updated = [...memos];
    updated[editIndex] = { title, text };
    setMemos(updated);
    setTitle('');
    setText('');
    setEditIndex(null);
    handleCloseMemo();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <ul>
        {memos.map((item, index) => (
          <li key={index}>
            <Button onClick={() => handleMemoOpen(index)}>{item.title}</Button>
          </li>
        ))}
      </ul>

      {/* 新規追加モーダル */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Form.Control
              required
              type="text"
              value={title}
              placeholder="タイトル"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            required
            type="text"
            value={text}
            placeholder="メモを入力"
            onChange={(e) => setText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            戻る
          </Button>
          <Button variant="primary" onClick={handlePush}>
            追加
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 編集モーダル */}
      <Modal show={showMemo} onHide={handleCloseMemo}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Form.Control
              required
              type="text"
              value={title}
              placeholder="タイトル"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            required
            type="text"
            value={text}
            placeholder="メモを編集"
            onChange={(e) => setText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMemo}>
            閉じる
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            保存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
