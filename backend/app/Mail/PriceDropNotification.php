<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PriceDropNotification extends Mailable {
    use Queueable, SerializesModels;

    public $message;

    public function __construct($message) {
        $this->message = $message;
    }

    public function build() {
        return $this->view('emails.price_drop')->with(['message' => $this->message]);
    }
}
